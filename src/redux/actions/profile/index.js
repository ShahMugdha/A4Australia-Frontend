import request from '../../../services/request.js'

export const getUserProfile = () => {
  return async(dispatch) => {
    await request.get('/profile').then((response) => {
      dispatch({
        type: "GET_PROFILE",
        payload: response.data
      });
    })
  };
};

export const updateUserAccountDetails = () => {
  return async(dispatch) => {
    await request.patch('/profile/account-details').then((response) => {
      dispatch({
        type: "UPDATE_ACCOUNT_DETAILS",
        payload: response.data
      })
    })
  }
}

export const setUserAddress = () => {
  return async(dispatch) => {
    await request.post('/address').then((response) => {
      dispatch({
        type: "SET_PROFILE_ADDRESS",
        payload: response.data
      })
    })
  }
}

export const updateUserAddresses = (addressId) => {
  return async(dispatch) => {
    await request.patch(`/address/${addressId}`).then((response) => {
      dispatch({
        type: "UPDATE_PROFILE_ADDRESS",
        payload: response.data
      })
    })
  }
}