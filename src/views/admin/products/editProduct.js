import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectProduct, updateProduct } from "../../../redux/actions/products";
import { logOut } from "../../../redux/actions/auth";
import "../../../components/admin/addProduct.css";
import { Link, useParams } from "react-router-dom";
import {Button} from "reactstrap";

const EditProduct = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth)
  const {productId} = useParams();
  const productEdit = JSON.parse(localStorage.getItem("product"))
  useEffect(() => {
    dispatch(selectProduct(productEdit))
  }, [dispatch])
  
  const [image, setImage] = useState(productEdit && productEdit.image ? productEdit.image : "")
  const [title, setTitle] = useState(productEdit? productEdit.title : "");
  const [description, setDescription] = useState(productEdit ? productEdit.description : "");
  const [subCategory, setSubCategory] = useState(productEdit ? productEdit.subCategory : "");
  const [category, setCategory] = useState(productEdit ? productEdit.category : "");
  const [price, setPrice] = useState(productEdit ? productEdit.price : "");
  
  const handleSave = (e) => {
    if(!image || !title || !description || !category || !subCategory || !price) {
      e.preventDefault()
      alert("Please enter all the required fields")
    }
    const formData = new FormData();
    formData.append("image", image);
    formData.append("title", title);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("subCategory", subCategory);
    formData.append("price", price);
    dispatch(updateProduct(productId, formData))
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
            <h2 className="uk-text-center">Main image</h2>
            <input type="file" id="txtMainImgID" name="txtMainImgID" onChange = {(e) => setImage(e.target.files[0])}/>
            {/* {image && (<div><img src = {URL.createObjectURL(image)} style={{height: "15rem", width: "12rem"}}/>{URL.createObjectURL(image)}</div>)} */} 
          </div>
        </div>
        <div className="uk-width-1-2">
          <div className='uk-width-1-1@s'>
            <h2 className="uk-text-center">Product Details</h2>
            <hr />
            <div className="uk-width-1-1@s">
              <label className="uk-form-label" for="txtModel">Title</label>
              <div className="uk-form-controls">
                <input className="uk-input" id="txtModel" type="text" value = {title} placeholder="P40 Warhawk" onChange={(e) => setTitle(e.target.value)}/>
              </div>
            </div>
            <div className="uk-margin">
              <label className="uk-form-label" for="txtBrand">Description</label>
              <div className="uk-form-controls">
                <input className="uk-input" id="txtBrand" type="text" value = {description} placeholder="Curtiss" onChange={(e) => setDescription(e.target.value)}/>
              </div>
            </div>
            <div className="uk-margin">
              <label className="uk-form-label" for="txtYear">Category</label>
              <div className="uk-form-controls">
                <input className="uk-input" id="txtYear" type="text" value = {category} placeholder="1938" onChange={(e) => setCategory(e.target.value)}/>
              </div>
            </div>
            <div className="uk-margin">
              <label className="uk-form-label" for="txtYear">Sub Category</label>
              <div className="uk-form-controls">
                <input className="uk-input" id="txtYear" type="text" value = {subCategory} placeholder="1938" onChange={(e) => setSubCategory(e.target.value)}/>
              </div>
            </div>
            <div className="uk-margin">
              <label className="uk-form-label" for="txtPrice">Price</label>
              <div className="uk-form-controls">
                <input className="uk-input" id="txtPrice" type="text" value = {price} placeholder="2,000,000" onChange={(e) => setPrice(e.target.value)}/>
              </div>
            </div>
            <Link to = "/admin/all-products"><Button onClick={(e) => handleSave(e)}>Save Product</Button></Link>
          </div>
        </div>
      </div>
    </div>
    </div>
    </>
  );
};

export default EditProduct;