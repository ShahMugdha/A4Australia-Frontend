import { combineReducers } from "redux";

// ** Reducers Imports
import profile from "./profile/index.js"
import products from "./products/index.js"
import wishlist from "./wishlist/index.js"
import auth from "./auth/index.js"

const rootReducer = combineReducers({
  auth,
  products,
  profile,
  wishlist
});

export default rootReducer;