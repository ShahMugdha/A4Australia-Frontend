import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { getParticularProduct } from "../../redux/actions/products";
import { Link, Redirect, useParams } from "react-router-dom";

const Product = () => {
  const dispatch = useDispatch();
  const {productId} = useParams()
  console.log(productId, "id")
  const user = useSelector(state => state.auth)
  useEffect(()=> {
    dispatch(getParticularProduct(productId))
  }, [dispatch])

  return(
    <>
      hello
    </>
  );
}

export default Product