import { React, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TopNavigation from "../../components/Navigation/topNav.js";
import HideTop from "../../components/Navigation/hideTop.js";
import { getProductByCategory, getParticularProduct } from "../../redux/actions/products/index.js";
import { addProductToWishList, getWishList } from "../../redux/actions/wishlist/index.js";
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';
import Footer from "../../components/footer.js";
import { toast } from 'react-toastify'
import { MoreVertical, Filter } from 'react-feather'
import "../../components/products.css"
import { Link, useParams } from 'react-router-dom';
import { 
  Button, 
  Label, 
  Input, 
  FormGroup, 
  Modal, 
  ModalBody, 
  ModalHeader, 
  ModalFooter 
} from 'reactstrap';
const ProductsByCategory = () => {
  const [formModal, setFormModal] = useState(false);
  const {category} = useParams()
  console.log(category, "cat")
  const productData = useSelector(state => state.products.productsByCategory)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getProductByCategory(category))
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
        <div id="wrap" style={{marginLeft: "14%", marginTop: "10%"}}>
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
export default ProductsByCategory;