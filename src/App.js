import React from "react";
import Home from './views/user/home.js';
import Profile from "./views/user/profile/display.js";
import Login from "./views/authentication/login.js";
import Product from "./views/user/product.js";
import ProductsByCategory from "./views/user/productsByCategory.js";
import ProductsBySubCategory from "./views/user/productsBySubCategory.js";
import Wishlist from "./views/user/wishlist.js";
import Cart from "./views/user/cart.js";
import CheckoutForm from "./views/user/payment/checkoutForm.js"
import {BrowserRouter, Route, Switch} from "react-router-dom";

import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';

const stripePromise = loadStripe('pk_test_51JL37MSIq5ANGvjea83Yo4FVR5XE1mHrrtU6E1qLyOJ3ct5fwMr36wq8bXm6GPos3wNtQ2DqhmUK0RrhZ9tgLnax00MyjOmoma');

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/collection/product/:productId">
          <Product/>
        </Route> 
        <Route path="/profile">
          <Profile />
        </Route>
        <Route path="/product/category/:category">
          <ProductsByCategory />
        </Route>
        <Route path="/product/:category/:subCategory">
          <ProductsBySubCategory />
        </Route>
        <Route path="/wishlist">
          <Wishlist />
        </Route>
        <Route path="/cart">
          <Cart />
        </Route>
        <Elements stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
        <Route path="/login">
          <Login />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
