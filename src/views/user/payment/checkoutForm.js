import {React, useEffect} from 'react';
import {useStripe, useElements, CardElement} from '@stripe/react-stripe-js';
import CardSection from './cardSection.js';

export default function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();

  useEffect(() => {
    if (!stripe || !elements) {
      return;
    }
  }, [stripe, elements])

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

  function stripePaymentMethodHandler(result) {
    if (result.error) {
      // Show error in payment form
    } else {
      // Otherwise send paymentMethod.id to your server (see Step 4)
      fetch('http://localhost:5000/pay', {
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
        name: 'Jenny Rosen',
      },
    });

    stripePaymentMethodHandler(result);
  };
  
  return (
    <form onSubmit={e => handleSubmit(e)}>
      <CardSection />
      <button type="submit" disabled={!stripe}>
        Submit Payment
      </button>
    </form>
  );
} 