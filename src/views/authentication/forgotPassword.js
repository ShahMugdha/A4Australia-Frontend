import { ChevronLeft } from "react-feather";
import { Link } from "react-router-dom";
import "../../components/forgotPassword.css"
import {
  Row,
  Col,
  CardTitle,
  CardText,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
} from "reactstrap";

import { useState } from "react";
import { useDispatch } from "react-redux";
import { otp, verifyOtp } from "../../redux/actions/auth";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [otpVal, setOtpVal] = useState();
  const dispatch = useDispatch();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const otpSent = dispatch(otp({email}));
    if(otpSent.success){
      setSent(true);
    }
  }

  const verifyOTP = async (event) => {
    event.preventDefault();
    console.log(otpVal, "otp");
    const result = dispatch(verifyOtp({email, otpVal}));
    if(result.success){
      console.log("otp verified")
      
    }
    else{
      console.log("OTP verification failed");
    }
  }

  return (
    <div className="forgot">
      <h1>Forgot Password</h1>
      <h6 className="information-text">Enter your registered email to reset your password.</h6>
      <div className="form-group">
        <input type="email" name="user_email" id="user_email"/>
        <p><label for="username">Email</label></p>
        <Link to = '/reset-password'><button onClick="showSpinner()">Reset Password</button></Link>
      </div>
      <div className="forgot-footer">
        <h5>New here? <Link to = '/signup'>Sign Up.</Link></h5>
        <h5>Already have an account? <Link to = '/login'>Sign In.</Link></h5>
        <p className="information-text"><span className="symbols" title="Lots of love from me to YOU!">&hearts; </span><a href="https://www.facebook.com/adedokunyinka.enoch" target="_blank" title="Connect with me on Facebook">Yinka Enoch Adedokun</a></p>
      </div>
    </div>
  );
};

export default ForgotPassword;