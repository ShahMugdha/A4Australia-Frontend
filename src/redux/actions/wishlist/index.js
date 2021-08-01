import request from "../../../services/request";

export const addProductToWishList = (productId) => {
  return async(dispatch) => {
    await request.post(`/wishlist/${productId}`).then((response) => {
      dispatch({
        type: "ADD_PRODUCT_TO_WISHLIST",
        payload: response.data
      });
    })
  };
}

export const getWishList = () => {
  return async(dispatch) => {
    await request.get(`/wishlist`).then((response) => {
      dispatch({
        type: "GET_WISHLIST",
        payload: response.data
      });
    })
  };
}