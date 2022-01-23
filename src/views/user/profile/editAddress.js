import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { Link, Redirect } from "react-router-dom";
import HideTop from "../../../components/Navigation/hideTop.js";
import Footer from "../../../components/footer.js";
import { logOut } from "../../../redux/actions/auth/index.js";
import { getMyAddress, updateAddress, selectAddress } from "../../../redux/actions/address/index.js";
import "../../../components/profileHome.css"
import { Button } from "@material-ui/core";

const EditAddress = () => {
  const dispatch = useDispatch();
  const user = localStorage.getItem("token")
  const addressData = useSelector(state => state.address)
  const [address, setAddress] = useState({
    name: addressData && addressData.selectedAddress ? addressData.selectedAddress.name : "",
    addressLine1: addressData && addressData.selectedAddress ? addressData.selectedAddress.addressLine1 : "",
    addressLine2: addressData && addressData.selectedAddress ? addressData.selectedAddress.addressLine2 : "",
    city: addressData && addressData.selectedAddress ? addressData.selectedAddress.city : "",
    state: addressData && addressData.selectedAddress ? addressData.selectedAddress.state : "",
    country: addressData && addressData.selectedAddress ? addressData.selectedAddress.country : "",
    postalCode: addressData && addressData.selectedAddress ? addressData.selectedAddress.postalCode : ""
  })

  const addressEdit = JSON.parse(localStorage.getItem("address"))
  console.log(address, "address")

  const handleLogOut = () => {
    logOut()
  }

  useEffect(()=> {
    dispatch(selectAddress(addressEdit))
  }, [dispatch])

  const handleClick = (e) => {
    if(!address.name || !address.addressLine1 || !address.addressLine2 || !address.city || !address.state || !address.country || !address.postalCode) {
      e.preventDefault()
      alert("Please enter all the required fields")
    }
    else {
      dispatch(updateAddress(addressData.selectedAddress._id, address))
    }
  }

  return(
    <>
      { user ? 
        <> 
          <HideTop/>
          <div style={{marginTop: "10%"}}>
            <div className="column1" style={{backgroundColor: "#f1f1f1"}}>
              <ul className="unordered">
                <Link to = "/profile"><li className="list"><Button>Account</Button></li></Link>
                <Link to = "/saved-addresses"><li className="list"><Button>Saved Addresses</Button></li></Link>
                <Link to = "/orders/my-orders"><li className="list"><Button>Orders</Button></li></Link>
              </ul>
            </div>
            <div className="column2" style={{backgroundColor: "#ddd"}}>
              <div className="edit-form" style={{marginTop: "5%", lineHeight: "150%"}}>
                <div className="">
                  <form action=""  method="POST">	
                    <div className="">
                      <div className="">
                        <div className="">
                          <label className="">Name:</label>
                          <input type="text" name="name" className="" value={address.name} onChange={e => setAddress({ ...address, name: e.target.value })} required />
                        </div>
                      </div>
                      <div className="">
                        <div className="">
                          <label className="">Address Line 1: </label>
                          <input type="text" name="address_line_1" className="" value={address.addressLine1} onChange={e => setAddress({ ...address, addressLine1: e.target.value })} required/>
                        </div>
                      </div>
                    </div>
                    <div className="">
                      <div className="">
                        <div className="">
                          <label className="">Address Line 2:</label>
                          <input type="text" name="address_line_2" className="" value={address.addressLine2} onChange={e => setAddress({ ...address, addressLine2: e.target.value })} required/>
                        </div>
                      </div>
                    </div>
                    <div className="">
                      <div className="">
                        <div className="">
                          <label className="">City:</label>
                          <input type="text" name="city" className="" value={address.city} onChange={e => setAddress({ ...address, city: e.target.value })} required/>						
                        </div>
                      </div>
                    </div>
                    <div className="">
                      <div className="">
                        <div className="">
                          <label className="">State:</label>
                          <input type="text" name="state" className="" value={address.state} onChange={e => setAddress({ ...address, state: e.target.value })} required/>						
                        </div>
                      </div>
                    </div>
                    <div className="">
                      <div className="">
                        <div className="">
                          <label className="">Country:</label>
                          <input type="text" name="country" className="" value={address.country} onChange={e => setAddress({ ...address, country: e.target.value })} required/>						
                        </div>
                      </div>
                    </div>
                    <div className="">
                      <div className="">
                        <div className="">
                          <label className="">Postal Code:</label>
                          <input type="text" name="postal_code" className="" value={address.postalCode} onChange={e => setAddress({ ...address, postalCode: e.target.value })} required/>						
                        </div>
                      </div>
                    </div>
                    <br/>
                    <div className="">
                      <div className="">
                        <div className="">
                        <Link to = "/saved-addresses"><Button type="submit" onClick={(e) => handleClick(e)} style={{cursor: "pointer", width: "100%", height: "3em", backgroundColor: "steelblue"}}>SAVE</Button></Link>
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

export default EditAddress