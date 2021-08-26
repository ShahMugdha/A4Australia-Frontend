import request from "../../../services/request";

export const addAddress = (addressData) => {
  return async(dispatch) => {
    await request.put('/address', addressData).then((response) => {
      dispatch({
        type: "ADD_ADDRESS",
        payload: response.data
      });
    })
  };
}

export const getAllAddresses = () => {
  return async(dispatch) => {
    await request.get('/address').then((response) => {
      dispatch({
        type: "GET_ALL_ADDRESSES",
        payload: response.data
      });
    })
  };
}

export const getMyAddress = () => {
  return async(dispatch) => {
    await request.get('/address/my-address').then((response) => {
      dispatch({
        type: "GET_MY_ADDRESS",
        payload: response.data
      });
    })
  };
}

export const updateAddress = () => {
  return async(dispatch) => {
    await request.patch(`/address/my-address`).then((response) => {
      dispatch({
        type: "UPDATE_ADDRESS",
        payload: response.data
      });
    })
  };
}

export const removeAddress = () => {
  return async(dispatch) => {
    await request.patch(`/address/my-address`).then((response) => {
      dispatch({
        type: "REMOVE_ADDRESS",
        payload: response.data
      });
    })
  };
}