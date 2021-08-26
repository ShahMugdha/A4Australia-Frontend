import {React, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {useStripe, useElements, CardElement} from '@stripe/react-stripe-js';
import CardSection from './cardSection.js';
import { getCartList } from '../../../redux/actions/cart/index.js';
import { getMyAddress } from '../../../redux/actions/address/index.js';

export default function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();
  const cart = useSelector(state => state.cart.cartData)
  const address = useSelector(state => state.address.myAddress.addresses)
  const count = address ? address.length: null
  const orderAddress = address ? address[count-1] : ''
  console.log(orderAddress, "final")
  console.log(count, "count")
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getCartList())
    dispatch(getMyAddress())
    if (!stripe || !elements) {
      return;
    }
  }, [stripe, elements, dispatch])

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
        email: cart.user.email,
        name: cart.user.name,
        phone: cart.user.mobile
      },
    });

    stripePaymentMethodHandler(result, cart.user._id);
  };
  
  return (
    <>
      <form><div style={{boxSizing: "border-box", padding: "20px", border: "5px solid blue"}}>Total Amount: {cart && cart[0] ? cart[0].totalPrice : 0} &nbsp; Total Quantity: {cart && cart[0] ? cart[0].totalQuantity : 0} </div></form>
      <form onSubmit={e => handleSubmit(e)} >
        <CardSection />
        <button type="submit" disabled={!stripe}>
          Pay {cart && cart[0] ? cart[0].totalPrice: null}
        </button>
      </form>
    </>
  );
} 