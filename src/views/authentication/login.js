import { useState } from "react";
import { Link, Redirect, useHistory, Route } from "react-router-dom";
import { Facebook, Twitter, Mail, Linkedin, Coffee } from "react-feather";
import {
  Row,
  Col,
  CardTitle,
  CardText,
  Form,
  Input,
  FormGroup,
  Label,
  CustomInput,
  Button,
} from "reactstrap";

import {login} from "../../redux/actions/auth/index.js";
import { useDispatch } from "react-redux";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const handleSubmit = (event) => {
    //event.preventDefault();
    const checkLogin = dispatch(login({ email, password, role: "CUSTOMER" }))
    console.log(checkLogin, "log check")
  }
  return (
    <div className='auth-wrapper auth-v2'>
      <Row className='auth-inner m-0'>
        <Col
          className='d-flex align-items-center auth-bg px-2 p-lg-5'
          lg='4'
          sm='12'
        >
          <Col className='px-xl-2 mx-auto' sm='8' md='6' lg='12'>
            <CardTitle
              tag='h2'
              className='mb-1'
              style={{
                fontFamily: 'Encode Sans, sans-serif',
                fontWeight: '600',
              }}
            >
              Please sign in to view your profile
            </CardTitle>
            <Form className='auth-login-form mt-2'>
              <FormGroup>
                <Label className='form-label' for='login-email'>
                  email id
                </Label>
                <Input
                  type='name'
                  id='login-email'
                  name='login-email'
                  value = {email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </FormGroup>
              <FormGroup>
                <Label className='form-label' for='login-email'>
                  password
                </Label>
                <Input
                  type='password'
                  id='login-email'
                  name='login-email'
                  value = {password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </FormGroup>
              <Link to = '/' color='primary' block onClick={e => handleSubmit(e)}>
                Sign In
              </Link>
              <Link to="/forgot-password" className="float-right">
                  <small>Forgot Password?</small>
                </Link>
              <Link to = '/signup' color='primary'>
                Don't have an account ? Sign up
              </Link>
            </Form>
          </Col>
        </Col>
      </Row>
    </div>
  );
};

export default Login;