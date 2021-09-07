import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Redirect, useHistory, Route } from "react-router-dom";
import { getProductList, deleteProduct } from "../../redux/actions/products";
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import "../../components/admin/allProducts.css"
import {Button} from "reactstrap";

const AllProducts = () => {
  const user = useSelector(state => state.auth)
  const productData = useSelector(state => state.products.productData)
  const key = 'title';
  const productsUniqueByKey = [...new Map(productData.map(item => [item[key], item])).values()];
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProductList())
  }, [dispatch])
  const handleDelete = (productId) => {
    dispatch(deleteProduct(productId))
  }
  const handleEdit = (product) => {
    localStorage.setItem("product", JSON.stringify(product));
  }
  return (
    <>
      { user.isAuth ? null : <Link to="/login"></Link> }
      <Link to = "/admin/add-new-product"><Button>Add new product</Button></Link>
      {productsUniqueByKey.length > 0 ? (  
          productsUniqueByKey.map((product) => {
            console.log(product.image, "image")
            return (
              <>
                <Link to = "/admin/single-product">
                  <div className="parent">
                    <div className="child">
                      <img src={product.image}/>
                    </div>
                    <div className="child2">
                      <DeleteIcon style={{float: "right"}} onClick={() => handleDelete(product._id)}/>
                      <Link to = {`/admin/edit-product/${product._id}`}><EditIcon style={{float: "right", color: "black"}} onClick={() => handleEdit(product)}/></Link>
                      <br/>
                      <div>{product.title}</div>
                      <div>Rs. {product.price}</div>
                    </div>
                  </div>
                </Link>
              </>
            )
          })
      ) : (
        <h1> Products not available</h1>
      )}
    </>
  );
};

export default AllProducts;