import { React, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { updateInventoryStock } from "../../../redux/actions/inventory";
import { getProductList } from "../../../redux/actions/products";
import { logOut } from "../../../redux/actions/auth";
import "../../../components/admin/addProduct.css";
import AccessDenied from "../../../components/error-pages/accessDenied.js"
import {Button} from "reactstrap";
import jwt_decode from 'jwt-decode';
import { useDispatch, useSelector } from "react-redux";

const EditProductInventory = () => {
  const adminToken = localStorage.getItem("token")
  var role
  if(adminToken) {
    role = jwt_decode(adminToken).role
  }
  const dispatch = useDispatch();
  const {productId} = useParams()
  const [size, setSize] = useState("");
  const [quantity, setQuantity] = useState(null);
  const editInvent = { size, quantity }

  useEffect(() => {
    dispatch(getProductList())
  }, [dispatch])

  const handleSave = (e) => {
    if(!size || !quantity) {
      e.preventDefault()
      alert("Please enter all the required fields")
    }
    dispatch(updateInventoryStock(productId, editInvent))
  }
  return (
    <>
      { adminToken && role === 'ADMIN' ?
        <>
          <div className="admin-sidenav">
            <Link to ="/admin/dashboard">Dashboard</Link>
            <Link to ="/admin/all-products">Products</Link>
            <Link to ="/admin/inventory">Inventory</Link>
            <Link to ="/admin/all-transactions">Transactions</Link>
            <Link to ="/admin" onClick = {() => logOut()}>Logout</Link>
          </div>
            <div className="admin-main">
          <div className="uk-container">
            <div uk-grid>
              <div className="uk-width-1-2">
                <div className='uk-width-1-1@s'>
                  <h2 className="uk-text-center">Edit Product Inventory</h2>
                  <hr />
                  <div className="uk-width-1-1@s">
                    <label className="uk-form-label" for="txtModel">Size</label>
                    <div className="uk-form-controls">
                      <input className="uk-input" id="txtModel" type="text" value = {size} placeholder="Size" onChange={(e) => setSize(e.target.value)}/>
                    </div>
                  </div>
                  <div className="uk-margin">
                    <label className="uk-form-label" for="txtBrand">Quantity</label>
                    <div className="uk-form-controls">
                      <input className="uk-input" id="txtBrand" type="text" value = {quantity} placeholder="Quantity" onChange={(e) => setQuantity(e.target.value)}/>
                    </div>
                  </div>
                  <Link to = "/admin/inventory"><Button onClick={(e) => handleSave(e)}>Save Inventory</Button></Link>
                </div>
              </div>
            </div>
          </div>
          </div>
        </> 
      : <AccessDenied/> }
    </>
  );
};

export default EditProductInventory;