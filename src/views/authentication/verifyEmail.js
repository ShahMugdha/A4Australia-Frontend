import {React, useState, useEffect} from 'react'
import { useDispatch } from 'react-redux';
import { verifyEmail } from '../../redux/actions/auth';
import { Link, useParams } from "react-router-dom";
import {
  Row,
  Col,
  CardTitle,
  CardText,
  Button
} from "reactstrap";

const VerifyEmail = () => {
  const dispatch= useDispatch()
  const {userId} = useParams()

  useEffect(() => {
    dispatch(verifyEmail(userId))
  }, [dispatch])

  return (
    <>
      hello
      <Link to ='/login'><Button>Login</Button></Link>
      {/* <div className="auth-wrapper auth-v2">
        <Row className="auth-inner m-0">
          <Col
            className="d-flex align-items-center auth-bg px-2 p-lg-5"
            lg="4"
            sm="12"
          >
            <Col className="px-xl-2 mx-auto" sm="8" md="6" lg="12">
              <CardTitle
                tag="h1"
                className="mb-1"
                style={{
                  fontFamily: "Nunito Sans, sans-serif",
                  fontWeight: "600",
                }}
              >
                VERIFY YOUR ACCOUNT NOW. 🚀
              </CardTitle>
              <CardText
                className="mb-2 text-font"
                style={{
                  fontFamily: "Nunito Sans, sans-serif",
                  fontWeight: "600",
                }}
              >
                We've sent a verification email to: roundtechinc@gmail.com
              </CardText>
              <CardText
                className="mb-1"
                style={{
                  fontFamily: "Nunito Sans, sans-serif",
                  fontWeight: "400",
                }}
              >
                Click the link in your email to verify your account. If you can't
                find the email, check your spam folder.
              </CardText>
              <CardText
                className="mb-2"
                style={{
                  fontFamily: "Nunito Sans, sans-serif",
                  fontWeight: "400",
                }}
              >
                Didn't receive Verification Email ?
              </CardText>
              <Link to="/login">
                <Button.Ripple type="submit" block color="primary">
                  Re-Send Email
                </Button.Ripple>
              </Link>
            </Col>
          </Col>
        </Row>
      </div> */}
    </>
  );
};

export default VerifyEmail;