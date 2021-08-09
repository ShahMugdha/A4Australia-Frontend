const initialState = {
  setCartData: {},
  removedProduct: {},
  updatedProduct: {},
  cartData: []
};
 
const CartReducer = (state = initialState, action) => {
  console.log(action, "action");
  switch (action.type) {
    case "ADD_PRODUCT_TO_CART":
      return { ...state, setCartData: action.payload.result };
    case "GET_CART_LIST":
      return { ...state, cartData: action.payload.result };
    case "UPDATE_PRODUCT_SIZE":
        return { ...state, updatedProduct: action.payload.result };
    case "UPDATE_PRODUCT_QUANTITY":
      return { ...state, updatedProduct: action.payload.result };
    case "MOVE_TO_WISHLIST":
      return { ...state, cartData: action.payload.result };
    case "REMOVE_FROM_CART":
      return { ...state, removedProduct: action.payload.result };
    default:
      return state;
  }
};
export default CartReducer;