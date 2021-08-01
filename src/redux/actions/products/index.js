import request from "../../../services/request";

export const getProductList = () => {
  return async(dispatch) => {
    await request.get('/product').then((response) => {
      dispatch({
        type: "GET_PRODUCTS",
        payload: response.data
      });
    })
  };
}

export const getParticularProduct = (productId) => {
  return async(dispatch) => {
    await request.get(`/product/collection/${productId}`).then((response) => {
      dispatch({
        type: "GET_PARTICULAR_PRODUCT",
        payload: response.data
      })
    })
  }
}

export const getProductByCategory = (category) => {
  return async(dispatch)=> {
    await request.get(`/product/${category}`).then((response) => {
      dispatch({
        type: "GET_PRODUCT_BY_CATEGORY",
        payload: response.data
      })
    })
  }
}

export const getProductBySubCategory = (category, subCategory) => {
  return async(dispatch)=> {
    await request.get(`/product/${category}/${subCategory}`).then((response) => {
      dispatch({
        type: "GET_PRODUCT_BY_SUB_CATEGORY",
        payload: response.data
      })
    })
  }
}