import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { Link, Redirect } from "react-router-dom";
import HideTop from "../../../components/Navigation/hideTop.js";
import { getUserProfile } from "../../../redux/actions/profile/index.js";
import { logOut } from "../../../redux/actions/auth/index.js";
import "../../../components/profileHome.css"
import { Button } from "@material-ui/core";
import EditIcon from '@material-ui/icons/Edit';

const Profile = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth)
  const profile = useSelector(state => state.profile)

  const handleLogOut = () => {
    logOut()
  }

  useEffect(()=> {
    dispatch(getUserProfile())
  }, [dispatch])

  return(
    <>
      { user.isAuth ? 
        <>
          <HideTop/>
          <div style={{marginTop: "10%"}}>
            <div className="column1" style={{backgroundColor: "#aaa"}}>
              <ul className="unordered">
                <Link to = "/profile"><li className="list"><Button>Account</Button></li></Link>
                <Link to = "/saved-addresses"><li className="list"><Button>Saved Addresses</Button></li></Link>
                <Link to = "/orders"><li className="list"><Button>Orders</Button></li></Link>
              </ul>
            </div>
            <div className="column2" style={{backgroundColor: "#bbb"}}>
              <Link to = "/edit-account"><div style={{float: "right", color: "black"}}><EditIcon/></div></Link>
              <div className = "profile-data">
                <div>First Name: {profile && profile.userProfileData && profile.userProfileData.user ? profile.userProfileData.user.firstName : ""}</div>
                <div>Last Name: {profile && profile.userProfileData && profile.userProfileData.user ? profile.userProfileData.user.lastName : ""}</div>
                <div>Full Name: {profile && profile.userProfileData && profile.userProfileData.user ? profile.userProfileData.user.name : ""}</div>
                <div>Email Id: {profile && profile.userProfileData && profile.userProfileData.user ? profile.userProfileData.user.email : ""}</div>
                <div>mobile: {profile && profile.userProfileData && profile.userProfileData.user ? profile.userProfileData.user.mobile : ""}</div>
              </div>
            </div>
          </div>
          <div className="Logout-button" onClick={() => handleLogOut()}><Link to = "/"><Button style={{backgroundColor: "lavender", marginTop: "5%"}}>Logout</Button></Link></div>
        </>
      : <Link to="/login"> Please Log In</Link> }     
    </>
  );
}

export default Profile