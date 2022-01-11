import { Link } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { otp } from "../../redux/actions/auth";
import "../../components/forgotPassword.css"
import {FormGroup, Input} from "reactstrap";
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'; 
toast.configure() 

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();
  let pattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/

  const handleSubmit = async (e) => {
    if(!email) {
      e.preventDefault()
      toast.error("Please enter your email", {autoClose:2000})
    }
    else if (email && !email.match(pattern)) {
      e.preventDefault()
      toast.error("Please enter a valid email", {autoClose:2000})
    } 
    dispatch(otp({email}))
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