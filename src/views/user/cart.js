import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { Link, Redirect } from "react-router-dom";
import { FormGroup, Label, Button, Input} from "reactstrap";
import Navigation from "../../components/Navigation/navigation.js"
import Login from "../authentication/login.js";
import HideTop from "../../components/Navigation/hideTop.js";
import Footer from "../../components/footer.js";
import CloseIcon from '@material-ui/icons/Close';
import { getCartList, updateProductQuantity, updateProductSize, moveProductToWishList, deleteProductFromCart } from "../../redux/actions/cart/index.js";
import "../../components/cart.css"

const Cart = () => {
  const dispatch = useDispatch();
  const user = localStorage.getItem("token")
  const cartData = useSelector(state => state.cart.cartData)
  const [size, setSize] = useState("size")
  const [quantity, setQuantity] = useState(1)

  const changeSize = (event, productId, originalSize, updatedSize) => {
    setSize(event.target.value)
    dispatch(updateProductSize(productId, originalSize, updatedSize))
  }

  const changeQuantity = (event, productId, Size, Quantity) => {
    setQuantity(event.target.value)
    dispatch(updateProductQuantity(productId, Size, Quantity))
    document.location.reload()
  }

  const removeFromCart = (productId, Size) => {
    dispatch(deleteProductFromCart(productId, Size))
    document.location.reload()
  }

  const moveToWishList = (productId, Size) => {
    dispatch(moveProductToWishList(productId, Size))
    document.location.reload();
  }

  useEffect(()=> {
    dispatch(getCartList())
  }, [dispatch])

  return(
    <>
      { user ?
        <> 
          <HideTop/>
          <div className="cartprod">
            {cartData? (
              cartData.map(cart => (       
                cart.cart.map(cartProd => {
                  return(
                    <div /* className="layout" */>
                      <p /* className="col col-main" */>
                        <div style={{display: "flex", flexDirection: "column", height: "100%", boxSizing: "border-box", border: "solid pink 1px", marginBottom: "20px", textAlign: "right", padding: "2rem"}}>
                          {/* <CloseIcon style={{float: "right"}}/> */}
                          <img style={{height: "200px", width: "150px"}} src={`http://localhost:5000/${cartProd.product.image}`}/>
                          <span style={{marginTop: "-35%"}}>
                          <div>{cartProd.product.title}</div>
                          <div>Rs. {cartProd.price}</div>
                          <div>Size: {cartProd.size}</div>
                          <div>Quantity: {cartProd.quantity}</div>
                          <FormGroup style = {{color: "black"}} className="left">
                            <Label for="size" style={{color: "black"}}>Size: </Label>
                            <select
                              type="select"
                              name="size"
                              value = {size}
                              /* id={cartProd.product._id} */
                              onChange = {(e) => changeSize(e, cartProd.product._id, cartProd.size, e.target.value)}
                            >
                              <option value="Small">Small</option>
                              <option value="Medium">Medium</option>
                              <option value="Large">Large</option>
                            </select>
                          </FormGroup>
                          <FormGroup style = {{color: "black"}} role="complementary">
                            <Label for="quantity" style={{color: "black"}}>Quantity: </Label>
                            <select
                              type="select"
                              name="quantity"
                              value = {quantity}
                              /* id={cartProd.product._id} */
                              onChange = {(e) => changeQuantity(e, cartProd.product._id, cartProd.size, e.target.value)}
                            >
                              <option value="1">1</option>
                              <option value="2">2</option>
                              <option value="3">3</option>
                            </select>
                          </FormGroup>
                          </span>
                          <div className="layout" style={{marginTop: "0.5rem"}}>
                            <Button className="left" style={{marginLeft: "0.5rem", cursor: "pointer"}} onClick={() => removeFromCart(cartProd.product._id, cartProd.size)}>
                              Remove
                            </Button>
                            <Button style={{ cursor: "pointer"}} onClick={() => moveToWishList(cartProd.product._id, cartProd.size)}>
                              Move back to wishlist
                            </Button>
                            
                          </div>
                        </div>
                      </p>          
                    </div>  
                  )
                })
              ))
            ): (
              <h1>your cart is empty</h1>
            )}
            
            {cartData? (
              cartData.map(cart => {
                return(
                  <>
                    <div className = "order">
                      Order Summary
                      <div>Total Quantity: {cart.totalQuantity}</div>
                      <div>Total Price: {cart.totalPrice}</div>
                    </div>
                    <p>
                      <div style={{height: "100%", marginBottom: "20px"}} className="col col-complementary" role="complementary">
                        <Link to = "/wishlist"><Button>ADD MORE FROM WISHLIST</Button></Link>
                        <Link to = "/address"><Button>CHECKOUT</Button></Link>
                      </div>
                    </p>  
                  </> 
                )
              })
            ): (
              <h1></h1>
            )}    
          </div>
        </> 
      : <Link to="/login">Please Log In</Link> } 
      <Footer/>
    </>
  );
}

export default Cart