import React from "react";
import Home from './views/user/home.js';
import Profile from "./views/user/profile/accountDisplay.js";
import EditAccount from "./views/user/profile/editAccount.js";
import EditAddress from "./views/user/profile/editAddress.js";
import SavedAddresses from "./views/user/profile/savedAddresses.js";
import Orders from "./views/user/profile/orders.js";
import Login from "./views/authentication/login.js";
import SignUp from "./views/authentication/signUp";
import VerifyEmail from "./views/authentication/verifyEmail.js";
import ForgotPassword from "./views/authentication/forgotPassword.js";
import VerifyOtp from "./views/authentication/verifyOtp.js";
import ResetPassword from  "./views/authentication/resetPassword.js";
import AdminLogin from "./views/admin/adminLogin.js"
import AllProducts from "./views/admin/products/products.js";
import Dashboard from "./views/admin/dashboard.js";
import AddProduct from "./views/admin/products/addProduct.js";
import EditProduct from "./views/admin/products/editProduct.js";
import Inventory from "./views/admin/inventory/inventory.js";
import AddInventory from "./views/admin/inventory/addInventory.js";
import EditInventory from "./views/admin/inventory/editInventory.js";
import AllTransactions from "./views/admin/transactions.js";
import SingleTransaction from "./views/admin/singleTransaction.js";
import ProductDetail from "./views/user/productDetail.js";
import ProductsByCategory from "./views/user/productsByCategory.js";
import ProductsBySubCategory from "./views/user/productsBySubCategory.js";
import Wishlist from "./views/user/wishlist.js";
import Cart from "./views/user/cart.js";
import Address from "./views/user/payment/address.js";
import CheckoutForm from "./views/user/payment/checkoutForm.js";
import SuccessfulPayment from "./views/user/payment/successfulPayment.js";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import {Elements} from '@stripe/react-stripe-js';
import NotFound from "./components/error-pages/notFound.js"
import {loadStripe} from '@stripe/stripe-js';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY)
console.log(process.env.REACT_APP_STRIPE_PUBLIC_KEY, "stripe key")

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
          <EditProduct />
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
        <Route path="/admin/all-transactions">
          <AllTransactions />
        </Route>
        <Route path="/admin/transaction/:paymentIntentId">
          <SingleTransaction />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/signup">
          <SignUp />
        </Route>
        <Route path="/verify-email/:userId">
          <VerifyEmail />
        </Route>
        <Route path="/forgot-password">
          <ForgotPassword />
        </Route>
        <Route path="/verify-otp">
          <VerifyOtp />
        </Route>
        <Route path="/reset-password">
          <ResetPassword />
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
        <Route path="/orders/my-orders">
          <Orders />
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
        <Elements stripe={stripePromise} path="/pay">
          <CheckoutForm />
        </Elements>
        <Route path="/payment-successful">
          <SuccessfulPayment />
        </Route>
        <Route component={NotFound} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;