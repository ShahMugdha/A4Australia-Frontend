import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { Link } from "react-router-dom";
import {Button} from "reactstrap";
import HideTop from "../../../components/Navigation/hideTop.js";
import { getMyAddress, addAddress } from "../../../redux/actions/address/index.js";
import "../../../components/address.css"

const Address = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getMyAddress())
  }, [dispatch])
  const user = localStorage.getItem("token")
  const addressData = useSelector(state => state.address.myAddress)
  let count = 0
  let userAddress = {}

  if(addressData && addressData.addresses && addressData.addresses.length > 0) {
    count = addressData.addresses.length
    userAddress = addressData.addresses[count-1]
  }

  const [shipping, setShipping] = useState({
    name: userAddress.name,
    addressLine1: userAddress.addressLine1,
    addressLine2: userAddress.addressLine2,
    postalCode: userAddress.postalCode,
    city: userAddress.city,
    state: userAddress.state,
    country: userAddress.country
  })
  console.log(shipping, "add data")

  const handleClick = (e) => {
    if(!shipping.name || !shipping.addressLine1 || !shipping.postalCode || !shipping.city || !shipping.state || !shipping.country) {
      e.preventDefault()
      alert("Please enter all the required fields")
    }
    else dispatch(addAddress(shipping))
  }

  return(
    <>
      { user ? 
        <>
          {count && count.length>0 ? null : <div></div>}
          <HideTop/>
          <form action="#" method="post" style={{marginTop: "7%"}}>
            <div className="row shipping">
              <div className="col">
                <h3>Shipping Address</h3>
              </div>
            </div>
            
            <div className="row shipping">
              <div className="col">
                <label>Name</label>
                <input type="text" value={shipping.name} onChange={e => setShipping({ ...shipping, name: e.target.value })} required autoFocus="true"/>
              </div>
            </div>
            
            <div className="row shipping">
              <div className="col">
                <label>address line 1</label>
                <input type="text" value={shipping.addressLine1} onChange={e => setShipping({ ...shipping, addressLine1: e.target.value })} required/>
              </div>
            </div>

            <div className="row shipping">
              <div className="col">
                <label>address line 2</label>
                <input type="text" value={shipping.addressLine2} onChange={e => setShipping({ ...shipping, addressLine2: e.target.value })}/>
              </div>
            </div>
            
            <div className="row shipping">
              <div className="col">
                <label>city</label>
                <input type="text" value={shipping.city} onChange={e => setShipping({ ...shipping, city: e.target.value })} required/>
              </div>
              <div className="col">
                <label>State</label>
                <input type="text" value={shipping.state} onChange={e => setShipping({ ...shipping, state: e.target.value })} required/>
              </div>
              <div className="col shipping">
                <label for="country2">country</label>
                <input type="text" value={shipping.country} onChange={e => setShipping({ ...shipping, country: e.target.value })} required/>
              </div>
              <div className="col">
                <label for="postal-code">postal code</label>
                <input type="number"  value={shipping.postalCode} onChange={e => setShipping({ ...shipping, postalCode: e.target.value })} required/>
              </div>
            </div>


            <div className="row">
              <div className="col">
                <Link to = "/pay"><Button type="submit" onClick={(e) => handleClick(e)} style={{cursor: "pointer", width: "100%", height: "2.5em", backgroundColor: "rgb(252, 255, 211)"}}>CONTINUE</Button></Link>
              </div>
            </div>
          </form>
        </> 
      : <Link to="/login">Please log In</Link> } 
    </>
  );
}

export default Address