import {React, useEffect} from 'react'
import { useDispatch } from 'react-redux';
import { verifyEmail } from '../../redux/actions/auth';
import { Link, useParams } from "react-router-dom";
import {Button} from "reactstrap";

const VerifyEmail = () => {
  const dispatch= useDispatch()
  const {userId} = useParams()

  useEffect((e) => {
    dispatch(verifyEmail(userId, e))
  }, [dispatch])

  return (
    <>
      hello
      <Link to ='/login'><Button>Login</Button></Link>
    </>
  );
};

export default VerifyEmail;