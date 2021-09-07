import { React, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Facebook, Twitter, Mail, Linkedin, Coffee } from "react-feather";
import Select from "react-select";
import { addProductInventory } from "../../../redux/actions/inventory";
import { getProductList } from "../../../redux/actions/products";
import "../../../components/admin/addProduct.css"
import {Button} from "reactstrap";
import { useDispatch, useSelector } from "react-redux";

const AddProductInventory = () => {
  const dispatch = useDispatch();
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
  );
};

export default AddProductInventory;