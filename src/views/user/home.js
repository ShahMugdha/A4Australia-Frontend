import { React, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Navigation from "../../components/Navigation/navigation.js";
import SideNav from "../../components/Navigation/sideNav.js";
import HideTop from "../../components/Navigation/hideTop.js";
import { getProductList, getParticularProduct } from "../../redux/actions/products/index.js";
import { addProductToWishList, getWishList } from "../../redux/actions/wishlist/index.js";
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { toast } from 'react-toastify'
import { MoreVertical, Filter } from 'react-feather'
import "../../components/products.css"
import "../../components/Navigation/sideNav.css"
import { Link } from 'react-router-dom';
import { 
  Card, 
  CardBody, 
  Media, 
  Row, 
  Col, 
  Badge, 
  UncontrolledDropdown, 
  DropdownToggle, 
  DropdownMenu, 
  DropdownItem, 
  Button, 
  Label, 
  Input, 
  Form, 
  FormGroup, 
  Modal, 
  ModalBody, 
  ModalHeader, 
  ModalFooter 
} from 'reactstrap';
const Home = () => {
  let flag = 0
  const [formModal, setFormModal] = useState(false);
  const productData = useSelector(state => state.products.productData)
  const key = 'title';
  const productsUniqueByKey = [...new Map(productData.map(item => [item[key], item])).values()];
  console.log(productsUniqueByKey, "title unique")
  const wishlistData = useSelector(state => state.wishlist.wishlistData)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getProductList())
    dispatch(getWishList())
    console.log("hello")
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
      <Navigation/>
      {productsUniqueByKey.length > 0 ? (
        <div id="wrap">
          <div id="columns" className="columns_4">
          {productsUniqueByKey.map((product) => {
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
        <h1> Products not available</h1>
      )}
      <h3 className="made_by">Made with ♡</h3>
    </>
  );
};
export default Home;