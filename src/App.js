import React from "react";
import Home from './views/user/home.js';
import Profile from "./views/user/profile/display.js";
import Login from "./views/authentication/login.js";
import Product from "./views/user/product.js";
import ProductsByCategory from "./views/user/productsByCategory.js";
import ProductsBySubCategory from "./views/user/productsBySubCategory.js";
import Wishlist from "./views/user/wishlist.js";
import {BrowserRouter, Route, Switch} from "react-router-dom";
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
        <Route path="/login">
          <Login />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
