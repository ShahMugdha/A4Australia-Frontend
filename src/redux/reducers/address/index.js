const initialState = {
  setAddress: {},
  myAddress: {},
  updatedAddress: {},
  addresses: [],
  removedAddress: {},
  selectedAddress: {}
};
 
const AddressReducer = (state = initialState, action) => {
  console.log(action, "action");
  switch (action.type) {
    case "ADD_ADDRESS":
      return { ...state, setAddress: action.payload.result };
    case "GET_MY_ADDRESS":
      return { ...state, myAddress: action.payload.result };
    case "UPDATE_ADDRESS":
        return { ...state, updatedAddress: action.payload.result };
    case "GET_ALL_ADDRESSES":
      return { ...state, addresses: action.payload.result };
    case "REMOVE_ADDRESS":
      return { ...state, removedAddress: action.payload.result };
    case 'SELECT_ADDRESS':
      return { ...state, selectedAddress: action.payload }
    default:
      return state;
  }
};
export default AddressReducer;