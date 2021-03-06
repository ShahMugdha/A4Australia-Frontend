import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { Link } from "react-router-dom";
import HideTop from "../../../components/Navigation/hideTop.js";
import Footer from "../../../components/footer.js";
import { getMyAddress, removeAddress, selectAddress } from "../../../redux/actions/address/index.js";
import { logOut } from "../../../redux/actions/auth/index.js";
import "../../../components/savedAddresses.css"
import { Button } from "@material-ui/core";
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

const SavedAddresses = () => {
  const dispatch = useDispatch();
  const user = localStorage.getItem("token")
  const savedAddresses = useSelector(state => state.address)
  useEffect(()=> {
    dispatch(getMyAddress())
  }, [dispatch])

  const handleClick = (data) => {
    console.log(data, data._id, "data")
    dispatch(removeAddress(data._id))
    document.location.reload();
  }

  const handleEdit = (data) => {
    console.log(data, data._id, "data")
    localStorage.setItem("address", JSON.stringify(data));
    dispatch(selectAddress(data))
  }

  const handleLogOut = () => {
    logOut()
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
            <div className="column2" style={{backgroundColor: "rgb(252, 255, 211)", overflowY: "auto", boxShadow: '0 4px 5px 0 rgba(0, 0, 0, 0.2)'}}>
              {savedAddresses && savedAddresses.myAddress && savedAddresses.myAddress.addresses? (
              savedAddresses.myAddress.addresses.map(addressData => {
                return(
                  <div className="addresses">
                    <li key={addressData._id} className = "data">
                      <div style={{float: "right", color: "black", cursor: "pointer"}} onClick={() => handleClick(addressData)}><DeleteIcon/></div>
                      <Link to = "/edit-address"><div style={{float: "right", color: "black"}} onClick={() => handleEdit(addressData)}><EditIcon/></div></Link>
                      <div style={{textAlign: "left", marginLeft: "2rem"}}>
                        <div>Name: {addressData.name}</div>
                        <div>Address Line 1: {addressData.addressLine1}</div>
                        <div>Address Line 2: {addressData.addressLine2}</div>
                        <div>City: {addressData.city}</div>
                        <div>State: {addressData.state}</div>
                        <div>Country: {addressData.country}</div>
                        <div>Postal Code: {addressData.postalCode}</div>
                      </div>
                    </li>
                  </div> 
                )
              })
            ): (
              <h1>No saved Addresses</h1>
            )}
            </div>
          </div>  
          <div className="Logout-button" onClick={() => handleLogOut()}><Link to = "/"><Button style={{backgroundColor: "lavender", marginTop: "5%"}}>Logout</Button></Link></div>
        </> 
      : <Link to="/login"></Link> } 
      <Footer/>
    </>
  );
}

export default SavedAddresses