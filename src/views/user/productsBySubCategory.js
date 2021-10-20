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
import { Button } from 'reactstrap';
const ProductsBySubCategory = () => {
  const [formModal, setFormModal] = useState(false);
  const {category, subCategory} = useParams()
  const productData = useSelector(state => state.products.productsBySubCategory)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getProductBySubCategory(category, subCategory))
  }, [dispatch])

  const addToCart = (productId) => {
    setFormModal(!formModal)
    dispatch(getParticularProduct(productId))
  }

  const addToWishlist = (productId) => {
    dispatch(addProductToWishList(productId))
  }
  
  return(
    <>
      <HideTop/>
      <TopNavigation/>
      {productData.length > 0 ? (
        <div id="wrap" style={{marginLeft: "8%", marginTop: "10%"}}>
        <div id="columns" className="columns_4">
          {productData.map((product) => {
            return (
              <figure>
                <Link to = {`/collection/product/${product._id}`}><img style={{height: "300px"}} src="https://picsum.photos/500/300/?image=10"/></Link>
                <figcaption>{product.title} <FavoriteBorderOutlinedIcon style={{float: "right", fontSize: "23px"}} onClick={() => addToWishlist(product._id)}/></figcaption>
                <div style={{float: "left", color: "GrayText"}}>{product.description}</div><br/>
                <span style={{float: "left", height: "35px"}} className="price">Rs.{product.price}</span>
                <Button
                  className="button"
                  color="primary"
                  onClick={() => addToCart(product._id)}
                >
                  Add to Cart
                </Button>
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