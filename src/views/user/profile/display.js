import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { Link, Redirect } from "react-router-dom";
import { getUserProfile } from "../../../redux/actions/profile";

const Profile = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth)
  useEffect(()=> {
    if(user.isAuth) {
      dispatch(getUserProfile())
    }
  }, [dispatch])

  return(
    <>
      { user.isAuth ? null : <Link to="/login" /> }
    </>
  );
}

export default Profile