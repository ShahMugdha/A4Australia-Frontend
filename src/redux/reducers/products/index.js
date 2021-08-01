const initialState = {
  productData: [],
  particularProduct: {},
  productsByCategory: [],
  productsBySubCategory: []
};
 
const ProductReducer = (state = initialState, action) => {
console.log(action, "action");
switch (action.type) {
  case "GET_PRODUCTS":
    return { ...state, productData: action.payload.result };
  case "GET_PARTICULAR_PRODUCT":
    return {...state, particularProduct: action.payload.result};
  case "GET_PRODUCT_BY_CATEGORY":
    return {...state, productsByCategory: action.payload.result};
  case "GET_PRODUCT_BY_SUB_CATEGORY":
    return {...state, productsBySubCategory: action.payload.result};
  default:
    return state;
}
};
export default ProductReducer;