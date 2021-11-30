import request from "../../../services/request";
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'; 
toast.configure() 

export const addProductToWishList = (productId) => {
  return async(dispatch) => {
    await request.post(`/wishlist/${productId}`).then((response) => {
      dispatch({
        type: "ADD_PRODUCT_TO_WISHLIST",
        payload: response.data
      });
      if(response.data.success === true){
        toast.success(response.data.message, {autoClose:2000})
      }
      else if(response.data.success === false){
        toast.error(response.data.message)
      }
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
      if(response.data.success === true){
        console.log("suc")
        toast.success(response.data.message, {autoClose:2000})
      }
      else {
        console.log("err")
        toast.error(response.data.message, {autoClose:2000})
      }
    })
    setTimeout(function() {
      window.location.reload();
    }, 3000);
  };
}

export const deleteProductFromWishList = (productId) => {
  return async(dispatch) => {
    await request.patch(`/wishlist/${productId}`).then((response) => {
      dispatch({
        type: "DELETE_PRODUCT_FROM_WISHLIST",
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