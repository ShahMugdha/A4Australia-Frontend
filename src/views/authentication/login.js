import { useState } from "react";
import { Link } from "react-router-dom";
import "../../components/signIn.css"
import {login} from "../../redux/actions/auth/index.js";
import { useDispatch } from "react-redux";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const handleSubmit = async (event) => {
    dispatch(login({ email, password, role: "CUSTOMER" }, event))
  }
  return (
    <>
      <div className="outer">
        <div className="sign-up-card">
          <h3>Log In</h3>
          <div className="input-div">
            <label for="Email">Email</label>
            <input type="email" placeholder="Email" value = {email} onChange={(e) => setEmail(e.target.value)}/>
          </div>
          <div className="input-div">
            <label for="Password">Password</label>
            <input type="password" placeholder="Password" value = {password} onChange={(e) => setPassword(e.target.value)}/>
          </div>
          <Link to = '/' color='primary'  className="btn" block onClick={e => handleSubmit(e)}>
            Sign In
          </Link>
          <p>
          <Link to="/forgot-password" className="float-right">
            <small>Forgot Password?</small>
          </Link>
          </p>
          <p>Don't have account? <Link to = '/signup'>Sign Up</Link></p>
        </div>
      </div>
    </>
  );
};

export default Login;