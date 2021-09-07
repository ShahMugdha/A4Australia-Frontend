const initialState = {
  addProduct: {},
  productData: [],
  particularProduct: {},
  productsByCategory: [],
  productsBySubCategory: [],
  selectedProduct: {}
};
 
const ProductReducer = (state = initialState, action) => {
console.log(action, "action");
switch (action.type) {
  case "ADD_PRODUCTS":
    return { ...state, addProduct: action.payload.result };
  case "GET_PRODUCTS":
    return { ...state, productData: action.payload.result };
  case "GET_PARTICULAR_PRODUCT":
    return {...state, particularProduct: action.payload.result};
  case "GET_PRODUCT_BY_CATEGORY":
    return {...state, productsByCategory: action.payload.result};
  case "GET_PRODUCT_BY_SUB_CATEGORY":
    return {...state, productsBySubCategory: action.payload.result};
  case 'SELECT_PRODUCT':
    return { ...state, selectedProduct: action.payload }
  default:
    return state;
}
};
export default ProductReducer;