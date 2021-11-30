import { Link } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { resetPassword } from "../../redux/actions/auth";
import { ChevronLeft } from "react-feather";
import "../../components/forgotPassword.css"
import {Input, FormGroup} from "reactstrap";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const email = JSON.parse(localStorage.getItem("email"))
  console.log(email, "email")
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    if(!password || !confirmPassword) {
      e.preventDefault()
      alert("Please enter all the fields")
    }
    else if(password !== confirmPassword) {
      e.preventDefault()
      alert("Passwords don't match")
    }
    dispatch(resetPassword({email, password}))
  }

  return (
    <>
      <div className="forgot">
        <h1>RESET PASSWORD 🔒</h1>
        <h6 className="information-text">Your new password must be different from previously used passwords</h6>
        <FormGroup>
          <Input
            type='password'
            value = {password}
            onChange={(e) => setPassword(e.target.value)} 
          />
          <p><label for="new-password">New Password</label></p>
          <Input
            type='password'
            value = {confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)} 
          />
          <p><label for="confirm-password">Confirm Password</label></p>
          <Link to = '/login'><button onClick={(e) => handleSubmit(e)}>Set New Password</button></Link>
        </FormGroup>
        <br/>
        <Link to="/login">
          <ChevronLeft className="mr-25" size={14} />
          <span className="align-middle">Back to login</span>
        </Link>
      </div>
    </>
  );
};

export default ResetPassword;