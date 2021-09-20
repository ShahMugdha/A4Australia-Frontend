import { React, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Navigation from "../../components/Navigation/navigation.js";
import SideNav from "../../components/Navigation/sideNav.js";
import HideTop from "../../components/Navigation/hideTop.js";
import Footer from "../../components/footer.js";
import { getProductList, getParticularProduct, selectProduct } from "../../redux/actions/products/index.js";
import { addProductToWishList, getWishList } from "../../redux/actions/wishlist/index.js";
import { addProductToCart } from "../../redux/actions/cart/index.js";
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { toast } from 'react-toastify'
import { MoreVertical, Filter } from 'react-feather'
import "../../components/products.css"
import "../../components/Navigation/sideNav.css"
import "../../components/addToCartPopUp.css"
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';
const Home = () => {
  const [size, setSize] = useState("Small")
  const productData = useSelector(state => state.products.productData)
  const particularProduct = useSelector(state => state.products.particularProduct)
  const key = 'title';
  const productsUniqueByKey = [...new Map(productData.map(item => [item[key], item])).values()];
  const wishlistData = useSelector(state => state.wishlist.wishlistData)

  /* function myFunction() {
    document.getElementById("myDropdown").classList.toggle("whr-drop-hide");
  }
  
  window.onclick = function(event) {
    if (!event.target.matches('.dropbtn')) {
  
      var dropdowns = document.getElementsByClassName("dropdown-content");
      var i;
      for (i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        if (openDropdown.classList.contains('whr-drop-hide')) {
          openDropdown.classList.remove('whr-drop-hide');
        }
      }
    }
  } */

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getProductList())
    dispatch(getWishList())
    console.log("hello")
  }, [dispatch])

  const addToCart = (productId, Size) => {
    dispatch(getParticularProduct(productId, Size))
  }

  const addToWishlist = (productId) => {
    dispatch(addProductToWishList(productId))
  }

  return(
    <>
      <HideTop/>
      <Navigation/>
      {productsUniqueByKey.length > 0 ? (
        <div id="wrap" style={{marginLeft: "13%"}}>
          <div id="columns" className="columns_4">
          {productsUniqueByKey.map((product) => {
            return (
              <figure>
                <Link to = {`/collection/product/${product._id}`}><img style={{height: "300px"}} src={`http://localhost:5000/${product.image}`}/></Link>
                <figcaption>{product.title} <FavoriteBorderOutlinedIcon style={{float: "right", fontSize: "23px"}} onClick={() => addToWishlist(product._id)}/></figcaption>
                <div style={{float: "left", color: "GrayText"}}>{product.description}</div><br/>
                <span style={{float: "left", height: "35px"}} className="price">Rs.{product.price}</span>
                <div className="dropdown">
                <Button
                  className="button"
                  onClick={() => addToCart(product._id)}
                >
                  Add to Cart
                </Button>
                <div id="popup1" className="overlay">
                  <div className="popup">
                    <h2>Here i am</h2>
                    <a className="close" href="#">&times;</a>
                    <div className="content">
                      Thank to pop me out of that button, but now i'm done so you can close this window.
                    </div>
                  </div>
                </div>
                {/* <div id="myDropdown" className="dropdown-content">
                  <div className="whr-drop-main">
                    <input className="whr-used-drop" type="radio" name="size" value="Small" onChange={() => setSize("Small")}/> <label class="whr-used-drop-lbl">Small</label>
                  </div>
                  <div className="whr-drop-main">
                    <input className="whr-used-drop" type="radio" name="size" value="Medium"/> <label class="whr-used-drop-lbl">Medium</label>
                  </div>
                  <div className="whr-drop-main">
                    <input className="whr-used-drop" type="radio" name="size" value="Large"/> <label class="whr-used-drop-lbl">Large</label>
                  </div>
                </div> */}
                </div>
              </figure>   
            )
          })}
          </div>
        </div>
      ) : (
        <h1> Products not available</h1>
      )}
      <h3 className="made_by">Made with ♡</h3>
      <Footer/>
    </>
  );
};
export default Home;