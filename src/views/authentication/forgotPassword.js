import { Link } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { otp } from "../../redux/actions/auth";
import "../../components/forgotPassword.css"
import {FormGroup, Input} from "reactstrap";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = async () => {
    const res = dispatch(otp({email}))
    console.log(res, "res")
    localStorage.setItem('email', JSON.stringify(email));
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
        <Link to = '/verify-otp'><button onClick={(e) => handleSubmit(e)}>Send OTP</button></Link>
      </FormGroup>
      <div className="forgot-footer">
        <h5>New here? <Link to = '/signup'>Sign Up.</Link></h5>
        <h5>Already have an account? <Link to = '/login'>Sign In.</Link></h5>
      </div>
    </div>
  );
};

export default ForgotPassword;