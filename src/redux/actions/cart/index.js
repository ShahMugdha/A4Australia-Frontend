import request from "../../../services/request";
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'; 
toast.configure() 

export const addProductToCart = (productId) => {
  return async(dispatch) => {
    await request.post(`/product/${productId}`).then((response) => {
      dispatch({
        type: "ADD_PRODUCT_TO_CART",
        payload: response.data
      });
      if(response.data.success === true){
        toast.success(response.data.message, {autoClose:2000})
      }
      else {
        toast.error(response.data.message)
      }
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
      if(response.data.success === true){
        toast.success(response.data.message, {autoClose:2000})
      }
      else {
        toast.error(response.data.message)
      }
    })
    setTimeout(function() {
      window.location.reload();
    }, 3000);
  };
}

export const updateProductSize = (productId, originalSize, updatedSize) => {
  return async(dispatch) => {
    await request.patch(`/cart/update-product-size/${productId}/${originalSize}/${updatedSize}`).then((response) => {
      dispatch({
        type: "UPDATE_PRODUCT_SIZE",
        payload: response.data
      });
      if(response.data.success === true){
        toast.success(response.data.message, {autoClose:2000})
      }
      else {
        toast.error(response.data.message)
      }
    })
    setTimeout(function() {
      window.location.reload();
    }, 3000);
  };
}

export const moveProductToWishList = (productId, size) => {
  return async(dispatch) => {
    await request.patch(`/cart/move-to-wishlist/${productId}/${size}`).then((response) => {
      dispatch({
        type: "MOVE_TO_WISHLIST",
        payload: response.data
      });
      if(response.data.success === true){
        toast.success(response.data.message, {autoClose:2000})
      }
      else {
        toast.error(response.data.message)
      }
    })
  };
}

export const deleteProductFromCart = (productId, size) => {
  return async(dispatch) => {
    await request.patch(`/cart/remove-product/${productId}/${size}`).then((response) => {
      dispatch({
        type: "REMOVE_FROM_CART",
        payload: response.data
      });
      if(response.data.success === true){
        toast.success(response.data.message, {autoClose:2000})
      }
      else {
        toast.error(response.data.message)
      }
    })
  };
}

export const deleteCart = () => {
  return async(dispatch) => {
    await request.delete(`/cart`).then((response) => {
      dispatch({
        type: "REMOVE_CART",
        payload: response.data
      });
    })
  };
}