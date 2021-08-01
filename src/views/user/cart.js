import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { Link, Redirect } from "react-router-dom";

const Cart = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth)
  useEffect(()=> {
  }, [dispatch])

  return(
    <>
      { user.isAuth ? null : <Link to="/login" /> }
    </>
  );
}

export default Cart