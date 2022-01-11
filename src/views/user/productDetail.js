import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { getParticularProduct } from "../../redux/actions/products";
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';
import { FormGroup, Label, Input, Button } from "reactstrap";
import { addProductToWishList, getWishList, deleteProductFromWishList, moveProductToCart } from "../../redux/actions/wishlist/index.js";
import { Link, Redirect, useParams } from "react-router-dom";
import HideTop from "../../components/Navigation/hideTop";
import Footer from "../../components/footer.js";
import "../../components/productDetail.css";
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'; 
toast.configure() 

const ProductDetail = () => {
  const [size, setSize] = useState("Small")
  const user = localStorage.getItem("token")
  const productData = useSelector(state => state.products.particularProduct)
  const wishlistData = useSelector(state => state.wishlist.wishlistData)
  let wishlistedProducts = []
  let objToAdd = {}
  var foundProduct

  if(wishlistData && wishlistData[0] && wishlistData[0].products) {
    wishlistData[0].products.map(wishProd => {
      if(wishProd._id === productData._id) {
        objToAdd = {productId: productData._id, wishlisted: true}
        wishlistedProducts = [...wishlistedProducts, objToAdd]
      }
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

  const moveToCart = (productId, Size) => {
    dispatch(moveProductToCart(productId, Size))
    if(!user){
      toast.error("Please login!", {autoClose:2000})
    }
  }

  const dispatch = useDispatch();
  const {productId} = useParams()
  console.log(productId, "id")
  useEffect(()=> {
    dispatch(getParticularProduct(productId))
    dispatch(getWishList())
  }, [dispatch])

  const product = useSelector(state => state.products.particularProduct)

  const addRemoveWishlist = (productId) => {
    if(!user){
      toast.error("Please login!", {autoClose:2000})
    }
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

  return(
    <>
      <HideTop/>
      <div className = "card-wrapper">
        <div className = "card"> 
          <img style={{height: "500px"}} src={`http://localhost:5000/${product.image}`}/>
          <div className = "product-content">
            <h2 className = "product-title">{product.title}</h2>

            <div className = "product-price">
              <p className = "new-price">Price: <span>Rs. {product.price}</span></p>
            </div>

            <div className = "product-detail">
              <h2>about this item: </h2>
              <p>{product.description}</p>
              <ul>
                <li>Color: <span>Black</span></li>
                <li>Category: <span>{product.category}</span></li>
                <li>Sub Category: <span>{product.subCategory}</span></li>
                <li>Shipping Area: <span>All over the world</span></li>
                <li>Shipping Fee: <span>Free</span></li>
              </ul>
            </div>
            <FormGroup>
              <Label for="size">Size:</Label>
              <Input style={{marginLeft: "10px"}}
                type="select"
                name="size"
                value = {size}
                placeholder="Small"
                onChange = {(e) => setSize(e.target.value)}
              >
                <option value="Small">Small</option>
                <option value="Medium">Medium</option>
                <option value="Large">Large</option>
              </Input>
            </FormGroup>

            <div className = "purchase-info">
              <button type = "button" className = "btn">
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
                    style={{color: "#f40d30", cursor: "pointer"}} 
                    onClick={() => addRemoveWishlist(product._id)}
                  />
                : 
                <FavoriteBorderOutlinedIcon
                  style={{cursor: "pointer"}} 
                  onClick={() => addRemoveWishlist(product._id)}
                />
              }
              </button>
              <button type = "button" className = "btn" onClick = {() => moveToCart(product._id, size)}><ShoppingCartOutlinedIcon/></button>
            </div>
          </div>
        </div>
      </div>
      <Footer/>
    </>
  );
}

export default ProductDetail