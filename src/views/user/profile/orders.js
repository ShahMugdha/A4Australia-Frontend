import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { Link, Redirect } from "react-router-dom";
import HideTop from "../../../components/Navigation/hideTop.js";
import Footer from "../../../components/footer.js";
import { getMyAddress, removeAddress, selectAddress } from "../../../redux/actions/address/index.js";
import { getMyOrder } from "../../../redux/actions/order/index.js";
import "../../../components/savedAddresses.css"
import { Button } from "@material-ui/core";
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

const Orders = () => {
  const dispatch = useDispatch();
  const user = localStorage.getItem("token")
  const savedAddresses = useSelector(state => state.address)
  useEffect(()=> {
    dispatch(getMyAddress())
    dispatch(getMyOrder())
  }, [dispatch])

  const handleEdit = (data) => {
    console.log(data, data._id, "data")
    localStorage.setItem("address", JSON.stringify(data));
    dispatch(selectAddress(data))
  }

  return(
    <>
      { user ? 
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
              {savedAddresses && savedAddresses.myAddress && savedAddresses.myAddress.addresses? (
              savedAddresses.myAddress.addresses.map(addressData => {
                return(
                  <div className="addresses">
                    <li key={addressData._id} className = "data">
                      <div>Name: {addressData.name}</div>
                      <div>Address Line 1: {addressData.addressLine1}</div>
                      <div>Address Line 2: {addressData.addressLine2}</div>
                      <div>City: {addressData.city}</div>
                      <div>State: {addressData.state}</div>
                      <div>Country: {addressData.country}</div>
                      <div>Postal Code: {addressData.postalCode} </div>
                    </li>
                  </div> 
                )
              })
            ): (
              <h1></h1>
            )}
            </div>
          </div>  
          <Button>Logout</Button>
        </> 
      : <Link to="/login"></Link> } 
      <Footer/>
    </>
  );
}

export default Orders