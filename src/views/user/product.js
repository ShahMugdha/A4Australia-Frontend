import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { getParticularProduct } from "../../redux/actions/products";
import { Link, Redirect, useParams } from "react-router-dom";
import HideTop from "../../components/Navigation/hideTop";

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
      <HideTop/>
      hello
    </>
  );
}

export default Product