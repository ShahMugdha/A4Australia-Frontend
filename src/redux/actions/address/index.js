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

export const updateAddress = (addressId, address) => {
  return async(dispatch) => {
    await request.patch(`/address/my-address/update/${addressId}`, address).then((response) => {
      dispatch({
        type: "UPDATE_ADDRESS",
        payload: response.data
      });
    })
  };
}

export const removeAddress = (addressId) => {
  console.log(addressId, "id")
  return async(dispatch, getState) => {
    await request.patch(`/address/my-address/remove/${addressId}`).then((response) => {
      dispatch({
        type: "REMOVE_ADDRESS",
        payload: response.data
      });
    })/* .then(dispatch(getMyAddress(getState().address.myAddress.addresses))); */
  };
}

export const selectAddress = (address) => (dispatch) => dispatch({ type: "SELECT_ADDRESS", payload: address });