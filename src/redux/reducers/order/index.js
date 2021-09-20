const initialState = {
  orderData: {},
  getAllOrders: [],
  getMyOrder: {},
  getCustomerOrder: {}
};
 
const OrderReducer = (state = initialState, action) => {
  console.log(action, "action");
  switch (action.type) {
    case "CREATE_ORDER":
      return {...state, orderData: action.payload.result}
    case "GET_MY_ORDER":
      return { ...state, getMyOrder: action.payload.result };
    case "GET_CUSTOMER_ORDER":
      return { ...state, getCustomerOrder: action.payload.result };
    case "GET_ALL_ORDERS":
      return { ...state, getAllOrders: action.payload.result };
    default:
      return state;
  }
};
export default OrderReducer;