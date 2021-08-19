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

export const getCartList = () => {
  return async(dispatch) => {
    await request.get('/cart').then((response) => {
      dispatch({
        type: "GET_CART_LIST",
        payload: response.data
      });
    })
  };
}

export const updateProductQuantity = (productId, size, quantity) => {
  return async(dispatch) => {
    await request.patch(`/cart/update-product-quantity/${productId}/${size}/${quantity}`).then((response) => {
      dispatch({
        type: "UPDATE_PRODUCT_QUANTITY",
        payload: response.data
      });
    })
  };
}

export const updateProductSize = (productId, originalSize, updatedSize) => {
  return async(dispatch) => {
    await request.patch(`/cart/update-product-size/${productId}/${originalSize}/${updatedSize}`).then((response) => {
      dispatch({
        type: "UPDATE_PRODUCT_SIZE",
        payload: response.data
      });
    })
  };
}

export const moveProductToWishList = (productId, size) => {
  return async(dispatch) => {
    await request.post(`/cart/move-to-wishlist/${productId, size}`).then((response) => {
      dispatch({
        type: "MOVE_TO_WISHLIST",
        payload: response.data
      });
    })
  };
}

export const deleteProductFromCart = (productId, size) => {
  return async(dispatch) => {
    await request.patch(`/cart/${productId, size}`).then((response) => {
      dispatch({
        type: "REMOVE_FROM_CART",
        payload: response.data
      });
    })
  };
}