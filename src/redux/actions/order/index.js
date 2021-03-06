import request from "../../../services/request";

export const createOrder = (paymentIntentId) => {
  return async(dispatch) => {
    await request.post(`/order/${paymentIntentId}`).then((response) => {
      dispatch({
        type: "CREATE_ORDER",
        payload: response.data
      });
    })
  };
}

export const getMyOrder = () => {
  return async(dispatch) => {
    await request.get('/order/my-order').then((response) => {
      dispatch({
        type: "GET_MY_ORDER",
        payload: response.data
      });
    })
  };
}

export const getCustomerOrder = (paymentIntentId) => {
  return async(dispatch) => {
    await request.get(`/order/${paymentIntentId}`).then((response) => {
      dispatch({
        type: "GET_CUSTOMER_ORDER",
        payload: response.data
      });
    })
  };
}

export const getAllOrders = () => {
  return async(dispatch) => {
    await request.get(`/order/all-orders`).then((response) => {
      dispatch({
        type: "GET_ALL_ORDERS",
        payload: response.data
      });
    })
  };
}