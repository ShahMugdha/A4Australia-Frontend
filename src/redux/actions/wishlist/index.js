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

export const moveProductToCart = (productId, size) => {
  return async(dispatch) => {
    await request.post(`/wishlist/move-to-cart/${productId}/${size}`).then((response) => {
      dispatch({
        type: "MOVE_PRODUCT_TO_CART",
        payload: response.data
      });
    })
    document.location.reload()
  };
}

export const deleteProductFromWishList = (productId) => {
  return async(dispatch) => {
    await request.patch(`/wishlist/${productId}`).then((response) => {
      dispatch({
        type: "DELETE_PRODUCT_FROM_WISHLIST",
        payload: response.data
      });
    })
  };
}