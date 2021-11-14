const initialState = {
  paymentIntentId: {}
};
 
const TransactionReducer = (state = initialState, action) => {
  console.log(action, "action");
  switch (action.type) {
    case "GET_PAYMENT_INTENT_ID":
      return { ...state, paymentIntentId: action.payload.result };
    default:
      return state;
  }
};
export default TransactionReducer;