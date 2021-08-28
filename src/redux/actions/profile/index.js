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

export const updateUserAccountDetails = (account) => {
  const fullname = account.firstName + " " + account.lastName
  const param = { ...account, name: fullname};
  return async(dispatch) => {
    await request.patch('/profile/account-details', param).then((response) => {
      dispatch({
        type: "UPDATE_ACCOUNT_DETAILS",
        payload: response.data
      })
    })
  }
}