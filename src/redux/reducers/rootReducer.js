import { combineReducers } from "redux";

// ** Reducers Imports
import profile from "./profile/index.js"
import products from "./products/index.js"
import wishlist from "./wishlist/index.js"
import cart from "./cart/index.js"
import address from "./address/index.js"
import auth from "./auth/index.js"

const rootReducer = combineReducers({
  auth,
  products,
  profile,
  wishlist,
  cart,
  address
});

export default rootReducer;