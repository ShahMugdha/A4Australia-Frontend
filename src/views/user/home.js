import { React, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Navigation from "../../components/Navigation/navigation.js";
import HideTop from "../../components/Navigation/hideTop.js";
import Footer from "../../components/footer.js";
import { getProductList, getParticularProduct, selectProduct } from "../../redux/actions/products/index.js";
import { addProductToWishList, getWishList, deleteProductFromWishList } from "../../redux/actions/wishlist/index.js";
import { addProductToCart } from "../../redux/actions/cart/index.js";
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';
import { toast } from 'react-toastify'
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
  let wishlistedProducts = []
  let objToAdd = {}
  var foundProduct

  if(wishlistData && wishlistData[0] && wishlistData[0].products) {
    productData.map(prod => {
      wishlistData[0].products.map(wishProd => {
        if(wishProd._id === prod._id) {
          objToAdd = {productId: prod._id, wishlisted: true}
          wishlistedProducts = [...wishlistedProducts, objToAdd]
        }
      })
    })
  }

  const markWishlisted = (productId) => {
    objToAdd = {productId, wishlisted: true}
    wishlistedProducts = [...wishlistedProducts, objToAdd]
  }

  const unMarkWishlisted = (productId) => {
    for(var i = 0; i < wishlistedProducts.length; i++) {
      if(wishlistedProducts[i].productId == productId) {
        wishlistedProducts.splice(i, 1);
        break;
      }
    }
  }
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getProductList())
    dispatch(getWishList())
  }, [dispatch])

  const addToCart = (productId, Size) => {
    dispatch(getParticularProduct(productId, Size))
  }

  const addRemoveWishlist = (productId) => {
    wishlistedProducts.forEach(prod => {
      if(prod.productId === productId) {
        foundProduct = productId
      }
    }) 
    if(foundProduct !== productId) {
      console.log(foundProduct, "add")
      markWishlisted(productId)
      dispatch(addProductToWishList(productId))
    }
    else if(foundProduct === productId) {
      console.log(foundProduct, "delete")
      unMarkWishlisted(productId)
      dispatch(deleteProductFromWishList(productId))
    }
    window.location.reload()
  }
  console.log(wishlistedProducts, "wihsprod ob")

  return(
    <>
      <HideTop/>
      <Navigation/>
      {productsUniqueByKey.length > 0 ? (
        <div id="wrap" style={{marginLeft: "12%"}}>
          <div id="columns" className="columns_4">
          {productsUniqueByKey.map((product) => {
            return (
              <figure>
                <Link to = {`/collection/product/${product._id}`}>
                  <img style={{height: "300px"}} src={`http://localhost:5000/${product.image}`}/>
                </Link>

                <figcaption>
                  {product.title} 
                  {
                    wishlistedProducts.forEach(prod => {
                      if(prod.productId === product._id) {
                        foundProduct = prod.productId
                      }
                    }) 
                  }
                  {
                    foundProduct === product._id? 
                      <FavoriteIcon 
                        style={{float: "right", fontSize: "23px", color: "#f40d30", cursor: "pointer"}} 
                        onClick={() => addRemoveWishlist(product._id)}
                      />
                    : 
                    <FavoriteBorderOutlinedIcon
                      style={{float: "right", fontSize: "23px", cursor: "pointer"}} 
                      onClick={() => addRemoveWishlist(product._id)}
                    />
                  }
                  
                </figcaption>
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