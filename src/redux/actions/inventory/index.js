import request from "../../../services/request";

export const getParticularProductInventory = (productId) => {
  return async(dispatch) => {
    await request.get(`/inventory/${productId}`).then((response) => {
      dispatch({
        type: "GET_PRODUCT_INVENTORY",
        payload: response.data
      });
    })
  };
}

export const getInventoryList = () => {
  return async(dispatch) => {
    await request.get(`/inventory`).then((response) => {
      dispatch({
        type: "GET_INVENTORY_LIST",
        payload: response.data
      });
    })
  };
}

export const addProductInventory = (productId, addInvent) => {
  return async(dispatch) => {
    await request.post(`/inventory/${productId}`, addInvent).then((response) => {
      dispatch({
        type: "ADD_INVENTORY",
        payload: response.data
      });
    })
  };
}

export const updateInventoryStock = (productId, editInvent) => {
  return async(dispatch) => {
    await request.patch(`/inventory/${productId}`, editInvent).then((response) => {
      dispatch({
        type: "UPDATE_INVENTORY_STOCK",
        payload: response.data
      });
    })
  };
}

export const deleteProductInventory = (productId) => {
  return async(dispatch) => {
    await request.delete(`/inventory/${productId}`).then((response) => {
      dispatch({
        type: "REMOVE_INVENTORY",
        payload: response.data
      });
    })
  };
}