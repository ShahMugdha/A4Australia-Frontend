import {React} from "react";
import {Link} from "react-router-dom";
import './accessDenied.css'

const AccessDenied = () => {
  return(
    <>
      <div className = "out">
        <div className="scene">
          <div className="overlay"></div>
          <div className="overlay"></div>
          <div className="overlay"></div>
          <div className="overlay"></div>
          <span className="bg-403">403</span>
          <div className="text">
            <span className="hero-text"></span>
            <span className="msg">can't let <span>you</span> in.</span>
            <span className="support">
              <span>unexpected?</span>
              <Link to ="/admin">Login as Admin</Link>
            </span>
          </div>
          <div className="lock"></div>
        </div>
      </div> 
    </>
  )
}
export default AccessDenied;