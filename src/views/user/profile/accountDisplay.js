import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { Link, Redirect } from "react-router-dom";
import HideTop from "../../../components/Navigation/hideTop.js";
import Footer from '../../../components/footer.js';
import { getUserProfile } from "../../../redux/actions/profile/index.js";
import { logOut } from "../../../redux/actions/auth/index.js";
import "../../../components/profileHome.css"
import { Button } from "@material-ui/core";
import EditIcon from '@material-ui/icons/Edit';

const Profile = () => {
  const dispatch = useDispatch();
  const user = localStorage.getItem("token")
  const userDetails = JSON.parse(localStorage.getItem('user'))
  const userData = userDetails && userDetails.userData ? userDetails.userData : ''
  const profile = useSelector(state => state.profile)

  const handleLogOut = () => {
    logOut()
  }

  useEffect(()=> {
    dispatch(getUserProfile())
  }, [dispatch])

  return(
    <>
      { user ? 
        <> 
          {profile ? <><HideTop/>
          <div style={{marginTop: "10%"}}>
            <div className="column1" style={{backgroundColor: "#aaa"}}>
              <ul className="unordered">
                <Link to = "/profile"><li className="list"><Button>Account</Button></li></Link>
                <Link to = "/saved-addresses"><li className="list"><Button>Saved Addresses</Button></li></Link>
                <Link to = "/orders/my-orders"><li className="list"><Button>Orders</Button></li></Link>
              </ul>
            </div>
            <div className="column2" style={{backgroundColor: "#bbb"}}>
              <Link to = "/edit-account"><div style={{float: "right", color: "black"}}><EditIcon/></div></Link>
              <div className = "profile-data">
                <div>First Name: {profile && profile.userProfileData && profile.userProfileData.user ? profile.userProfileData.user.firstName : userData.firstName}</div>
                <div>Last Name: {profile && profile.userProfileData && profile.userProfileData.user ? profile.userProfileData.user.lastName : userData.lastName}</div>
                <div>Full Name: {profile && profile.userProfileData && profile.userProfileData.user ? profile.userProfileData.user.name : userData.name}</div>
                <div>Email Id: {profile && profile.userProfileData && profile.userProfileData.user ? profile.userProfileData.user.email : userData.email}</div>
                <div>mobile: {profile && profile.userProfileData && profile.userProfileData.user ? profile.userProfileData.user.mobile : userData.mobile}</div>
              </div>
            </div>
          </div>
          <div className="Logout-button" onClick={() => handleLogOut()}><Link to = "/"><Button style={{backgroundColor: "lavender", marginTop: "5%", marginLeft: "27%"}}>Logout</Button></Link></div></> : <p>You have no profile</p>}
          
        </>
      : <Link to="/login"> Please Log In</Link> }  
      <Footer/>    
    </>
  );
}

export default Profile