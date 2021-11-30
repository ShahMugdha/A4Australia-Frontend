import {React, useState, useEffect} from 'react';
import OtpInput from 'react-otp-input';
import { useDispatch } from 'react-redux';
import { verifyEmail } from '../../redux/actions/auth';
import { Link, useParams } from "react-router-dom";
import { verifyOtp } from "../../redux/actions/auth";
import {
  Input,
  Button
} from "reactstrap";

const VerifyOtp = () => {
  const [otp, setOtp] = useState(0)
  const email = JSON.parse(localStorage.getItem("email"))
  console.log(email, "email")
  const dispatch= useDispatch()

  const handleChange = (e) => {
    dispatch(verifyOtp({email, otp}));
  }

  return (
    <>
      <OtpInput
        value={otp}
        isInputNum={true}
        shouldAutoFocus={true}
        onChange={(otp) => setOtp(otp)}
        numInputs={6}
        separator={<span>-</span>}
      />
      <Link to ='/reset-password'><Button onClick={(e) => handleChange(e)}>Reset Password</Button></Link>
    
    </>
  );
};

export default VerifyOtp;