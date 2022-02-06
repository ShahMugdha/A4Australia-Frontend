import { React, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import TopNavigation from "../../components/Navigation/topNav.js";
import HideTop from "../../components/Navigation/hideTop.js";
import { getProductByCategory } from "../../redux/actions/products/index.js";
import { addProductToWishList, getWishList, deleteProductFromWishList } from "../../redux/actions/wishlist/index.js";
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';
import Footer from "../../components/footer.js";
import "../../components/products.css"
import { Link, useParams } from 'react-router-dom';

const ProductsByCategory = () => {
  const {category} = useParams()
  const productData = useSelector(state => state.products.productsByCategory)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getProductByCategory(category))
    dispatch(getWishList())
  }, [dispatch])

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
    setTimeout(function() {
      window.location.reload();
    }, 3000);
  }
  console.log(wishlistedProducts, "wihsprod ob")
  
  return(
    <>
      <HideTop/>
      <TopNavigation/>
      {productData.length > 0 ? (
        <div id="wrap" style={{marginLeft: "12%", marginTop: "10rem"}}>
        <div id="columns" className="columns_4">
          {productData.map((product) => {
            return (
              <figure>
                <Link to = {`/collection/product/${product._id}`}><img style={{height: "300px"}} src={`http://localhost:5000/${product.image}`} alt=''/></Link>
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
              </figure> 
            )
          })}
        </div>
        </div>
      ) : (
        <h1 style={{marginTop: "10%"}}> Products not available</h1>
      )}
      <Footer/>
    </>
  );
};
export default ProductsByCategory;