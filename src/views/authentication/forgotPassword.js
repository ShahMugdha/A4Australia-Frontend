import { ChevronLeft } from "react-feather";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { otp, verifyOtp } from "../../redux/actions/auth";
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

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [otpVal, setOtpVal] = useState();
  const dispatch = useDispatch();

  const handleSubmit = async (event) => {
    /* const otpSent =  */dispatch(otp({email}));
    /* if(otpSent.success){
      setSent(true);
    }
    else {
      event.preventDefault();
    } */
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
      <FormGroup>
        <Input
          type='email'
          id='login-email'
          name='login-email'
          value = {email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <p><label for="username">Email</label></p>
        <Link to = '/reset-password'><button onClick={(e) => handleSubmit(e)}>Reset Password</button></Link>
      </FormGroup>
      <div className="forgot-footer">
        <h5>New here? <Link to = '/signup'>Sign Up.</Link></h5>
        <h5>Already have an account? <Link to = '/login'>Sign In.</Link></h5>
        <p className="information-text"><span className="symbols" title="Lots of love from me to YOU!">&hearts; </span><a href="https://www.facebook.com/adedokunyinka.enoch" target="_blank" title="Connect with me on Facebook">Yinka Enoch Adedokun</a></p>
      </div>
    </div>
  );
};

export default ForgotPassword;