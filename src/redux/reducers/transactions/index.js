const initialState = {
  allTransactions: [],
  singleTransaction: {}
};
 
const TransactionReducer = (state = initialState, action) => {
console.log(action, "action");
switch (action.type) {
  case "GET_SINGLE_TRANSACTION":
    return { ...state, singleTransaction: action.payload.result };
  case "GET_ALL_TRANSACTIONS":
    return { ...state, allTransactions: action.payload.result };
  default:
    return state;
}
};
export default TransactionReducer;