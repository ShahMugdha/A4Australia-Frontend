import { React, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TopNavigation from "../../components/Navigation/topNav.js";
import Footer from "../../components/footer.js";
import HideTop from "../../components/Navigation/hideTop.js";
import { getProductBySubCategory, getParticularProduct } from "../../redux/actions/products/index.js";
import { addProductToWishList, getWishList } from "../../redux/actions/wishlist/index.js";
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';
import { toast } from 'react-toastify'
import "../../components/products.css"
import { Link, useParams } from 'react-router-dom';

const ProductsBySubCategory = () => {
  const {category, subCategory} = useParams()
  const productData = useSelector(state => state.products.productsBySubCategory)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getProductBySubCategory(category, subCategory))
  }, [dispatch])

  const addToWishlist = (productId) => {
    dispatch(addProductToWishList(productId))
  }
  
  return(
    <>
      <HideTop/>
      <TopNavigation/>
      {productData.length > 0 ? (
        <div id="wrap" style={{marginLeft: "8%", marginTop: "10rem"}}>
        <div id="columns" className="columns_4">
          {productData.map((product) => {
            return (
              <figure>
                <Link to = {`/collection/product/${product._id}`}><img style={{height: "300px"}} src={`http://localhost:5000/${product.image}`}/></Link>
                <figcaption>{product.title} <FavoriteBorderOutlinedIcon style={{float: "right", fontSize: "23px"}} onClick={() => addToWishlist(product._id)}/></figcaption>
                <div style={{float: "left", color: "GrayText"}}>{product.description}</div><br/>
                <span style={{float: "left", height: "35px"}} className="price">Rs.{product.price}</span>
              </figure>  
            )
          })}
        </div>
        </div>
      ) : (
        <h1 style={{marginTop: "10%"}}> Products not available</h1>
      )}
      <h3 className="made_by">Made with ♡</h3>
      <Footer/>
    </>
  );
};
export default ProductsBySubCategory;