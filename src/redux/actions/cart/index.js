import request from "../../../services/request";

export const addProductToCart = (productId) => {
  return async(dispatch) => {
    await request.post(`/product/${productId}`).then((response) => {
      dispatch({
        type: "ADD_PRODUCT_TO_CART",
        payload: response.data
      });
    })
  };
}