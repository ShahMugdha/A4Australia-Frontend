import React from "react";
import Home from './views/user/home.js';
import Profile from "./views/user/profile/accountDisplay.js";
import EditAccount from "./views/user/profile/editAccount.js";
import EditAddress from "./views/user/profile/editAddress.js";
import SavedAddresses from "./views/user/profile/savedAddresses.js";
import Login from "./views/authentication/login.js";
import AdminLogin from "./views/admin/adminLogin.js"
import AllProducts from "./views/admin/products.js";
import Dashboard from "./views/admin/dashboard.js";
import AddProduct from "./views/admin/addProduct.js";
import SingleProduct from "./views/admin/singleProduct.js";
import Inventory from "./views/admin/inventory/inventory.js";
import AddInventory from "./views/admin/inventory/addInventory.js";
import EditInventory from "./views/admin/inventory/editInventory.js"
import ProductDetail from "./views/user/productDetail.js";
import ProductsByCategory from "./views/user/productsByCategory.js";
import ProductsBySubCategory from "./views/user/productsBySubCategory.js";
import Wishlist from "./views/user/wishlist.js";
import Cart from "./views/user/cart.js";
import Address from "./views/user/payment/address.js";
import CheckoutForm from "./views/user/payment/checkoutForm.js"
import {BrowserRouter, Route, Switch} from "react-router-dom";

import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import { Edit } from "react-feather";

const stripePromise = loadStripe('pk_test_51JL37MSIq5ANGvjea83Yo4FVR5XE1mHrrtU6E1qLyOJ3ct5fwMr36wq8bXm6GPos3wNtQ2DqhmUK0RrhZ9tgLnax00MyjOmoma');

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/admin">
          <AdminLogin />
        </Route>
        <Route path="/admin/dashboard">
          <Dashboard />
        </Route>
        <Route path="/admin/all-products">
          <AllProducts />
        </Route>
        <Route path="/admin/add-new-product">
          <AddProduct />
        </Route>
        <Route path = "/admin/edit-product/:productId">
          <AddProduct />
        </Route>
        <Route path="/admin/single-product">
          <SingleProduct />
        </Route>
        <Route path="/admin/inventory">
          <Inventory />
        </Route>
        <Route path="/admin/add-inventory">
          <AddInventory />
        </Route>
        <Route path="/admin/edit-inventory/:productId">
          <EditInventory />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/collection/product/:productId">
          <ProductDetail/>
        </Route> 
        <Route path="/profile">
          <Profile />
        </Route>
        <Route path="/edit-account">
          <EditAccount />
        </Route>
        <Route path="/saved-addresses">
          <SavedAddresses />
        </Route>
        <Route path="/edit-address">
          <EditAddress />
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
        <Route path="/address">
          <Address />
        </Route>
        <Elements stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      </Switch>
    </BrowserRouter>
  );
}

export default App;