import {React, useEffect} from "react";
import {Link} from "react-router-dom";
import './notFound.css';
import jwt_decode from 'jwt-decode';

const NotFound = () => {
  const token = localStorage.getItem("token")
  var role
  if(token) {
    role = jwt_decode(token).role
  }
  return(
    <>
        <div className="text-div">
          <h1 className="number">404</h1>
        </div>
        {token && role === 'ADMIN' ? <><Link to ="/admin"><button className="link-button">Go home</button></Link></> : <><Link to ="/"><button className="link-button">Go home</button></Link></>}
        <div className="tumble"></div>
    </>
  )
}
export default NotFound;