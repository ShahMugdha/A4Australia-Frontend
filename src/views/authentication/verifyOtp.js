import {React, useState, useEffect} from 'react'
import { useDispatch } from 'react-redux';
import { verifyEmail } from '../../redux/actions/auth';
import { Link, useParams } from "react-router-dom";
import {
  Input,
  Button
} from "reactstrap";

const VerifyOtp = () => {
  const dispatch= useDispatch()
  const {userId} = useParams()

  useEffect(() => {
    dispatch(verifyEmail(userId))
  }, [dispatch])

  return (
    <>
      hello
      <Input type="password" placeholder="enter the otp"></Input>
      <Link to ='/reset-password'><Button>Reset Password</Button></Link>
    
    </>
  );
};

export default VerifyOtp;