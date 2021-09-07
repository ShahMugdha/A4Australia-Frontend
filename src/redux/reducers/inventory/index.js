const initialState = {
  addInventory: {},
  removedInventory: {},
  updatedInventory: {},
  inventoryData: [],
  productInventory: {}
};
 
const InventoryReducer = (state = initialState, action) => {
  console.log(action, "action");
  switch (action.type) {
    case "GET_PRODUCT_INVENTORY":
      return {...state, productInventory: action.payload.result}
    case "ADD_INVENTORY":
      return { ...state, addInventory: action.payload.result };
    case "GET_INVENTORY_LIST":
      return { ...state, inventoryData: action.payload.result };
    case "UPDATE_INVENTORY_STOCK":
        return { ...state, updatedInventory: action.payload.result };
    case "REMOVE_INVENTORY":
      return { ...state, removedInventory: action.payload.result };
    default:
      return state;
  }
};
export default InventoryReducer;