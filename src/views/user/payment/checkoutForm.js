import {React, useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {useStripe, useElements, CardElement, PaymentRequestButtonElement} from '@stripe/react-stripe-js';
import CardSection from './cardSection.js';
import { getCartList } from '../../../redux/actions/cart/index.js';
import { getMyAddress } from '../../../redux/actions/address/index.js';

export default function CheckoutForm() {
  const stripe = useStripe();
  const [paymentRequest, setPaymentRequest] = useState(null);
  const elements = useElements();
  const cart = useSelector(state => state.cart.cartData[0])
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

  function handleServerResponse(response) {
    if (response.error) {
      // Show error from server on payment form
    } else if (response.requires_action) {
      // Use Stripe.js to handle required card action
      stripe.handleCardAction(
        response.payment_intent_client_secret
      ).then(handleStripeJsResult);
    } else {
      // Show success message
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
    if (result.error) {
      // Show error in payment form
    } else {
      // Otherwise send paymentMethod.id to your server (see Step 4)
      fetch(`http://localhost:5000/pay/${userId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          payment_method_id: result.paymentMethod.id,
        })
      }).then(function(result) {
        // Handle server response (see Step 4)
        result.json().then(function(json) {
          handleServerResponse(json);
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
          city: orderAddress.city,
          //country: orderAddress.country,
          line1: orderAddress.addressLine1,
          line2: orderAddress.addressLine2,
          state: orderAddress.state
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
      <form><div style={{boxSizing: "border-box", padding: "20px", border: "5px solid blue"}}>Total Amount: {cart ? cart.totalPrice : 0} &nbsp; Total Quantity: {cart ? cart.totalQuantity : 0} </div></form>
      <form onSubmit={e => handleSubmit(e)} >
        <CardSection />
        <button type="submit" disabled={!stripe}>
          Pay {cart ? cart.totalPrice: null}
        </button>
      </form>
    </>
  );
} 