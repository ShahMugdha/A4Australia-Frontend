import { useState } from "react";
import { Link } from "react-router-dom";
import {signup} from "../../redux/actions/auth/index.js";
import { useDispatch } from "react-redux";
import "../../components/signIn.css"
import {Button} from "reactstrap";

const SignUp = () => {
  const dispatch = useDispatch()
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSignUp = (e) => {
    if(!firstName || !lastName || !email || !mobile || !password || !confirmPassword) {
      e.preventDefault()
      alert("Please enter all the fields")
    }
    else if(password !== confirmPassword) {
      e.preventDefault()
      alert("Passwords don't match")
    }
    dispatch(signup({firstName, lastName, email, mobile, password}, e))
  }

  return (
    <>
      <div className="outer">
        <div className="sign-up-card">
          <h3>Please Sign Up</h3>
          <div className="input-div">
            <label for="FirstName">First Name</label>
            <input type="name" placeholder="First Name" value = {firstName} onChange={(e) => setFirstName(e.target.value)}/>
          </div>
          <div className="input-div">
            <label for="LastName">Last Name</label>
            <input type="name" placeholder="Last Name" value = {lastName} onChange={(e) => setLastName(e.target.value)}/>
          </div>
          <div className="input-div">
            <label for="Email">Email</label>
            <input type="email" placeholder="Email" value = {email} onChange={(e) => setEmail(e.target.value)}/>
          </div>
          <div className="input-div">
            <label for="Mobile">Mobile</label>
            <input type="tel" placeholder="Mobile Number" value = {mobile} onChange={(e) => setMobile(e.target.value)}/>
          </div>
          <div className="input-div">
            <label for="Password">Password</label>
            <input type="password" placeholder="Password" value = {password} onChange={(e) => setPassword(e.target.value)}/>
          </div>
          <div className="input-div">
            <label for="password">Confirm Password</label>
            <input type="password" placeholder="Confirm Password" value = {confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}/>
          </div>
          <Button color='primary' onClick={(e) => handleSignUp(e)}>
            Sign Up
          </Button>
          <p>Already have an account ?<Link to = '/login' color='primary'>Sign in</Link></p>
        </div>
      </div>
    </>
  );
};

export default SignUp;