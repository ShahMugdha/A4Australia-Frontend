import request from "../../../services/request";

export const paymentIntentsList = () => {
  return async(dispatch) => {
    await request.get(`/transaction/all-transactions`).then((response) => {
      dispatch({
        type: "GET_ALL_TRANSACTIONS",
        payload: response.data
      });
    })
  };
}

export const paymentIntentById = (paymentIntentId) => {
  return async(dispatch) => {
    await request.get(`/transaction/${paymentIntentId}`).then((response) => {
      dispatch({
        type: "GET_SINGLE_TRANSACTION",
        payload: response.data
      });
    })
  };
}
