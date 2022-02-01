import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { Link, Redirect } from "react-router-dom";
import HideTop from "../../../components/Navigation/hideTop.js";
import Footer from "../../../components/footer.js";
import { logOut } from "../../../redux/actions/auth/index.js";
import { getUserProfile, updateUserAccountDetails } from "../../../redux/actions/profile/index.js";
import "../../../components/profileHome.css"
import "../../../components/editAccount.css"
import { Button } from "@material-ui/core";

const EditAccount = () => {
  const dispatch = useDispatch();
  const user = localStorage.getItem("token")
  const userDetails = JSON.parse(localStorage.getItem('user'))
  const userData = userDetails && userDetails.userData ? userDetails.userData : ''
  const profile = useSelector(state => state.profile)
  const [account, setAccount] = useState({
    firstName: profile && profile.userProfileData && profile.userProfileData.user ? profile.userProfileData.user.firstName : userData.firstName,
    lastName: profile && profile.userProfileData && profile.userProfileData.user ? profile.userProfileData.user.lastName : userData.lastName,
    name: profile && profile.userProfileData && profile.userProfileData.user ? profile.userProfileData.user.name : userData.name,
    email: profile && profile.userProfileData && profile.userProfileData.user ? profile.userProfileData.user.email : userData.email,
    mobile: profile && profile.userProfileData && profile.userProfileData.user ? profile.userProfileData.user.mobile : userData.mobile,
  })

  const handleLogOut = () => {
    logOut()
  }

  useEffect(()=> {
    dispatch(getUserProfile())
  }, [dispatch])

  const handleClick = (e) => {
    if(!account.firstName || !account.lastName || !account.email || !account.mobile) {
      e.preventDefault()
      alert("Please enter all the required fields")
    }
    else {
      dispatch(updateUserAccountDetails(account))
    }
  }

  return(
    <>
      { user ?
        <> 
          <HideTop/>
          <div style={{marginTop: "10%"}}>
            <div className="column1" style={{backgroundColor: "#bdf", boxShadow: '0 4px 5px 0 rgba(0, 0, 0, 0.2)'}}>
              <ul className="unordered">
                <Link to = "/profile"><li className="list"><Button>Account</Button></li></Link>
                <Link to = "/saved-addresses"><li className="list"><Button>Saved Addresses</Button></li></Link>
                <Link to = "/orders/my-orders"><li className="list"><Button>Orders</Button></li></Link>
              </ul>
            </div>
            <div className="column2" style={{backgroundColor: "rgb(252, 255, 211)", boxShadow: '0 4px 5px 0 rgba(0, 0, 0, 0.2)'}}>
              <div className="edit-form">
                <div className="">
                  <form action=""  method="POST">	
                    <div className="">
                      <div className="">
                        <div className="">
                          <label className="">First Name:</label>
                          <input type="text" name="first_name" className="" value={account.firstName} onChange={e => setAccount({ ...account, firstName: e.target.value })} required />
                        </div>
                      </div>
                      <div className="">
                        <div className="">
                          <label className="">Last Name: </label>
                          <input type="text" name="last_name" className="" value={account.lastName} onChange={e => setAccount({ ...account, lastName: e.target.value })} required/>
                        </div>
                      </div>
                    </div>
                    <div className="">
                      <div className="">
                        <div className="">
                          <label className="">Email Address:</label>
                          <input type="email" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$" name="email" className="" value={account.email} onChange={e => setAccount({ ...account, email: e.target.value })} required/>
                        </div>
                      </div>
                    </div>
                    <div className="">
                      <div className="">
                        <div className="">
                          <label className="">Mobile Number:</label>
                          <input type="tel" name="phone" className="" value={account.mobile} onChange={e => setAccount({ ...account, mobile: e.target.value })} required pattern="[0-9]{10}"/>						
                        </div>
                      </div>
                    </div>
                    <br/>
                    <div className="">
                      <div className="">
                        <div className="">
                        <Link to = "/profile"><button type="submit" onClick={(e) => handleClick(e)} className="save" >SAVE</button></Link>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
          <div className="Logout-button" onClick={() => handleLogOut()}><Link to = "/"><Button style={{backgroundColor: "lavender", marginTop: "5%"}}>Logout</Button></Link></div>
        </> 
      : <Link to="/login">Please Log In</Link> } 
      <Footer/>
    </>
  );
}

export default EditAccount