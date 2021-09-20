import { useState } from "react";
import { Link, Redirect, useHistory, Route } from "react-router-dom";
import {signup} from "../../redux/actions/auth/index.js";
import { useDispatch } from "react-redux";
import {
  Row,
  Col,
  CardTitle,
  Form,
  Input,
  FormGroup,
  Label,
  Button
} from "reactstrap";


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
    dispatch(signup({firstName, lastName, email, mobile, password}))
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
              Please sign up 
            </CardTitle>
            <Form className='auth-login-form mt-2'>
              <FormGroup>
                <Label className='form-label' for='login-firstname'>
                  First Name
                </Label>
                <Input
                  type='name'
                  id='login-firstname'
                  name='login-firstname'
                  value = {firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </FormGroup>
              <FormGroup>
                <Label className='form-label' for='login-lastname'>
                  Last Name
                </Label>
                <Input
                  type='name'
                  id='login-lasttname'
                  name='login-lasttname'
                  value = {lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </FormGroup>
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
                <Label className='form-label' for='login-mobile'>
                  Mobile
                </Label>
                <Input
                  type="tel"
                  id='login-mobile'
                  name='login-mobile'
                  value = {mobile}
                  onChange={(e) => setMobile(e.target.value)}
                />
              </FormGroup>
              <FormGroup>
                <Label className='form-label' for='login-password'>
                  Password
                </Label>
                <Input
                  type="password"
                  id='login-password'
                  name='login-password'
                  value = {password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </FormGroup>
              <FormGroup>
                <Label className='form-label' for='login-confirmPassword'>
                  Confirm Password
                </Label>
                <Input
                  type="password"
                  id='login-confirmPassword'
                  name='login-confirmPassword'
                  value = {confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </FormGroup>
              <Button color='primary' onClick={(e) => handleSignUp(e)}>
                Sign Up
              </Button>
              <Link to = '/login' color='primary'>
                Already have an account ? sign in
              </Link>
            </Form>
          </Col>
        </Col>
      </Row>
    </div>
  );
};

export default SignUp;