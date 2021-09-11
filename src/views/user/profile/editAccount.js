import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { Link, Redirect } from "react-router-dom";
import HideTop from "../../../components/Navigation/hideTop.js";
import { getUserProfile, updateUserAccountDetails } from "../../../redux/actions/profile/index.js";
import "../../../components/profileHome.css"
import "../../../components/editAccount.css"
import { Button } from "@material-ui/core";

const EditAccount = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth)
  const profile = useSelector(state => state.profile)
  const [account, setAccount] = useState({
    firstName: profile && profile.userProfileData && profile.userProfileData.user ? profile.userProfileData.user.firstName : "",
    lastName: profile && profile.userProfileData && profile.userProfileData.user ? profile.userProfileData.user.lastName : "",
    name: profile && profile.userProfileData && profile.userProfileData.user ? profile.userProfileData.user.name : "",
    email: profile && profile.userProfileData && profile.userProfileData.user ? profile.userProfileData.user.email : "",
    mobile: profile && profile.userProfileData && profile.userProfileData.user ? profile.userProfileData.user.mobile : "",
  })
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
                    {/* <div className="">
                      <div className="">
                        <div className="">
                          <label className="">Gender:</label>
                          <select name="gender" className="" value="" required>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                          </select>
                        </div>
                      </div>
                    </div> */}
                    <br/>
                    <div className="">
                      <div className="">
                        <div className="">
                        <Link to = "/profile"><Button type="submit" onClick={(e) => handleClick(e)} style={{cursor: "pointer", width: "100%", height: "3em", backgroundColor: "steelblue"}}>SAVE</Button></Link>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
          <Button>Logout</Button>
        </> 
      : <Link to="/login">Please Log In</Link> }
    </>
  );
}

export default EditAccount