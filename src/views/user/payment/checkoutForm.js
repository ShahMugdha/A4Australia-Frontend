import {React, useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {useStripe, useElements, CardElement, PaymentRequestButtonElement} from '@stripe/react-stripe-js';
import CardSection from './cardSection.js';
import { Link, useHistory } from "react-router-dom";
import { getCartList, deleteCart } from '../../../redux/actions/cart/index.js';
import { getMyAddress } from '../../../redux/actions/address/index.js';
import { createOrder } from '../../../redux/actions/order/index.js';
import { deleteProductQuantity } from '../../../redux/actions/inventory/index.js';
import { Button } from 'reactstrap';
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'; 
toast.configure() 

export default function CheckoutForm() {
  const history = useHistory()
  const stripe = useStripe();
  const [paymentRequest, setPaymentRequest] = useState(null);
  const user = localStorage.getItem("token")
  const elements = useElements();
  const cart = useSelector(state => state.cart.cartData && state.cart.cartData[0] ? state.cart.cartData[0] : null)
  const address = useSelector(state => state.address.myAddress.addresses)
  const count = address ? address.length: null
  const orderAddress = address ? address[count-1] : ''
  console.log(cart && cart.user ? cart.user: null, "email")
  console.log(orderAddress, "final")
  console.log(count, "count")

  const options = {
    paymentRequest,
    style: {
      paymentRequestButton: {
        type: 'default',
        // One of 'default', 'book', 'buy', or 'donate'
        // Defaults to 'default'
  
        theme: 'dark',
        // One of 'dark', 'light', or 'light-outline'
        // Defaults to 'dark'
  
        height: '64px',
        // Defaults to '40px'. The width is always '100%'.
      },
    }
  }
  const dispatch = useDispatch()

  useEffect(() => {
    if (stripe) {
      const pr = stripe.paymentRequest({
        country: 'IN',
        currency: 'inr',
        total: {
          label: 'Demo total',
          amount: cart ? cart.totalPrice : 0
        },
        requestPayerName: true,
        requestPayerEmail: true,
      });
      pr.canMakePayment().then(result => {
        if (result) {
          setPaymentRequest(pr);
        }
      });
      console.log(pr, "pr")
    }
    dispatch(getCartList())
    dispatch(getMyAddress())
    if (!stripe || !elements) {
      return;
    }
  }, [stripe, elements, dispatch])

  if (paymentRequest) {
    return <PaymentRequestButtonElement options={options} />
  }
  console.log(paymentRequest, "req")

  function handleServerResponse(response, result) {
    if (response.error) {
      toast.danger("Payment Unsuccessful!", {autoClose:2000})
    } 
    
    else if (response.requires_action) {
      console.log("card needs action")
      stripe.handleCardAction(
        response.payment_intent_client_secret
      ).then(handleStripeJsResult);
    } 
    
    else {
      const paymentIntentId = localStorage.getItem("paymentIntentId")
      dispatch(createOrder(paymentIntentId))
      toast.success("Payment Successful!", {autoClose:2000})
      if(cart && cart.cart) {
        (cart.cart.map(
          cartData => dispatch(deleteProductQuantity(cartData.product._id, cartData.size, cartData.quantity))
        ))
      }
      dispatch(deleteCart())
      history.push('/payment-successful')
    }
  }
  
  function handleStripeJsResult(result) {
    if (result.error) {
      // Show error in payment form
    } else {
      // The card action has been handled
      // The PaymentIntent can be confirmed again on the server
      fetch('http://localhost:5000/pay', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ payment_intent_id: result.paymentIntent.id })
      }).then(function(confirmResult) {
        return confirmResult.json();
      }).then(handleServerResponse);
    }
  }

  function stripePaymentMethodHandler(result, userId) {
    const res = result
    if (result.error) {} 
    else {
      fetch(`http://localhost:5000/pay/${userId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          payment_method_id: result.paymentMethod.id,
        })
      })
      .then(function(result) {
        //localStorage.setItem('paymentIntentId', result.paymentMethod.id);
        result.json().then(function(json) {
          console.log(json, "intent json")
          localStorage.setItem('paymentIntentId', json.paymentIntentId);
          handleServerResponse(json, res);
        })
      });
    }
  }

  const handleSubmit = async (event) => {
    // We don't want to let default form submission happen here,
    // which would refresh the page.
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    const result = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
      billing_details: {
        // Include any additional collected billing details.
        //city: orderAddress.city,
        address: {
          city: orderAddress.city? orderAddress.city: null,
          //country: orderAddress.country,
          line1: orderAddress.addressLine1? orderAddress.addressLine1: null,
          line2: orderAddress.addressLine2? orderAddress.addressLine2: null,
          state: orderAddress.state? orderAddress.state: null
        },
        email: cart && cart.user ? cart.user.email: null,
        name: cart && cart.user ? cart.user.name: null,
        phone: cart && cart.user ? cart.user.mobile: null
      },
    });
    stripePaymentMethodHandler(result, cart.user._id);
  };
  
  return (
    <>
      { user ? 
        <> 
          <form style={{marginTop: "13.5%"}}><div style={{padding: "20px"}}>Total Amount: {cart ? cart.totalPrice : 0} &nbsp; Total Quantity: {cart ? cart.totalQuantity : 0} </div></form>
          <form onSubmit={e => handleSubmit(e)} >
            <CardSection />
            <Button type="submit" disabled={!stripe} style={{borderRadius: "7%", height: "2rem", marginTop: "1rem", width: "5rem", cursor: "pointer"}}>
              Pay {cart ? cart.totalPrice: null}
            </Button>
          </form>
          <Link to ="/cart"><Button style={{ borderRadius: "2%", width: "32%", height: "3rem", cursor: "pointer"}}>Go back to cart</Button></Link>
        </>
      : <Link to = "/login">Please Log In</Link> } 
    </>
  );
} 