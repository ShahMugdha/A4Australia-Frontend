const initialState = {
  setWishlistData: {},
  wishlistData: []
};
 
const WishListReducer = (state = initialState, action) => {
console.log(action, "action");
switch (action.type) {
  case "ADD_PRODUCT_TO_WISHLIST":
    return { ...state, setWishlistData: action.payload.result };
  case "GET_WISHLIST":
    return { ...state, wishlistData: action.payload.result };
  default:
    return state;
}
};
export default WishListReducer;