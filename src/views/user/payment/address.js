import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { Link, Redirect } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import { FormGroup, Label, Button, Input} from "reactstrap";
import HideTop from "../../../components/Navigation/hideTop.js";
import { getMyAddress, addAddress } from "../../../redux/actions/address/index.js";
import "../../../components/address.css"

const Address = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getMyAddress())
  }, [dispatch])
  const user = useSelector(state => state.auth)
  const addressData = useSelector(state => state.address.myAddress)
  const count = addressData && addressData.addresses ? addressData.addresses.length: null

  const [shipping, setShipping] = useState({
    name: addressData && addressData.addresses? addressData.addresses[count-1].name : '',
    addressLine1: addressData && addressData.addresses ? addressData.addresses[count-1].addressLine1 : '',
    addressLine2: addressData && addressData.addresses ? addressData.addresses[count-1].addressLine2 : '',
    postalCode: addressData && addressData.addresses ? addressData.addresses[count-1].postalCode : '',
    city: addressData && addressData.addresses ? addressData.addresses[count-1].city : '',
    state: addressData && addressData.addresses ? addressData.addresses[count-1].state : '',
    country: addressData && addressData.addresses ? addressData.addresses[count-1].country : ''
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
      { user.isAuth ? null : <Link to="/login" /> }
      {count ? null : <div>loading</div>}
      <HideTop/>
      <form action="#" method="post" style={{marginTop: "7%"}}>
        <div className="row shipping">
          <div className="col">
            <h3>Shipping Address</h3>
          </div>
        </div>
        
        <div className="row shipping">
          <div className="col">
            <label for="firstName2">Name</label>
            <input type="text" id="firstName2" value={shipping.name} onChange={e => setShipping({ ...shipping, name: e.target.value })} required/>
          </div>
        </div>
        
        <div className="row shipping">
          <div className="col">
            <label for="address2">address line 1</label>
            <input type="text" id="address2" value={shipping.addressLine1} onChange={e => setShipping({ ...shipping, addressLine1: e.target.value })} required/>
          </div>
        </div>

        <div className="row shipping">
          <div className="col">
            <label for="address2">address line 2</label>
            <input type="text" id="address" value={shipping.addressLine2} onChange={e => setShipping({ ...shipping, addressLine2: e.target.value })}/>
          </div>
        </div>
        
        <div className="row shipping">
          <div className="col">
            <label for="city2">city</label>
            <input type="text" id="city2" value={shipping.city} onChange={e => setShipping({ ...shipping, city: e.target.value })} required/>
          </div>
          <div className="col">
            <label for="state2">State</label>
            <input type="text" id="state2" value={shipping.state} onChange={e => setShipping({ ...shipping, state: e.target.value })} required/>
          </div>
          <div className="col shipping">
            <label for="country2">country</label>
            <input type="text" id="country2" value={shipping.country} onChange={e => setShipping({ ...shipping, country: e.target.value })} required/>
          </div>
          <div className="col">
            <label for="postal-code">postal code</label>
            <input type="text" id="cpostal-code" value={shipping.postalCode} onChange={e => setShipping({ ...shipping, postalCode: e.target.value })} required/>
          </div>
        </div>


        <div className="row">
          <div className="col">
            <Link to = "/pay"><Button type="submit" onClick={(e) => handleClick(e)} style={{cursor: "pointer", width: "100%", height: "2.5em", backgroundColor: "infoBackground"}}>CONTINUE</Button></Link>
          </div>
        </div>
      </form>
    </>
  );
}

export default Address