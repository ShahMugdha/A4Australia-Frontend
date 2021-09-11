import { React, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Select from "react-select";
import { addProductInventory } from "../../../redux/actions/inventory";
import { getProductList } from "../../../redux/actions/products";
import { logOut } from "../../../redux/actions/auth";
import "../../../components/admin/addProduct.css";
import "../../../components/admin/navSide.css";
import {Button} from "reactstrap";
import { useDispatch, useSelector } from "react-redux";

const AddProductInventory = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth)
  const products = useSelector(state => state.products.productData)
  const [productId, setProductId] = useState('')
  const [size, setSize] = useState("");
  const [quantity, setQuantity] = useState(null);
  const addInvent = { size, quantity }

  useEffect(() => {
    dispatch(getProductList())
  }, [dispatch])

  const productOptions = [];
  products.forEach(e => {
    productOptions.push({ value: e._id, label: e.title, color: "#00B8D9", isFixed: true })
  });
  const handleUserSet = (e) => {
    setProductId(e.value);
  }
  
  const handleSave = (e) => {
    if(!size || !quantity) {
      e.preventDefault()
      alert("Please enter all the required fields")
    }
    dispatch(addProductInventory(productId, addInvent))
  }
  return (
    <>
    { user.isAuth ? null : <Link to="/login"></Link> }
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
            <h2 className="uk-text-center">Add Product Inventory</h2>
            <hr />
            <div>
              <Select
                options={productOptions}
                //isMulti
                isClearable={false}
                value={productOptions.filter(obj => productId  === obj.value)}
                onChange={handleUserSet}
                className="react-select"
                classNamePrefix="select"
              />
            </div>
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
  );
};

export default AddProductInventory;