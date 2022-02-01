import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { Link } from "react-router-dom";
import { FormGroup, Label, Button } from "reactstrap";
import HideTop from "../../components/Navigation/hideTop.js";
import Footer from "../../components/footer.js";
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
  }

  const removeFromCart = (productId, Size) => {
    dispatch(deleteProductFromCart(productId, Size))
    setTimeout(function() {
      window.location.reload();
    }, 3000);
  }

  const moveToWishList = (productId, Size) => {
    dispatch(moveProductToWishList(productId, Size))
    setTimeout(function() {
      window.location.reload();
    }, 3000);
  }

  useEffect(()=> {
    dispatch(getCartList())
  }, [dispatch])

  return(
    <>
      { user ?
        <> 
          <HideTop/>
          <div style={{marginTop: "8%"}}>
            {cartData[0] && cartData[0].cart && cartData[0].cart.length>0 ? (
              cartData.map(cart => (       
                cart.cart.map(cartProd => {
                  return(
                    <div className="cart-container">
                      <div className="cart-left">
                        <img style={{height: "200px", width: "150px"}} src={`http://localhost:5000/${cartProd.product.image}`}/>
                      </div>
                      <div className="cart-right">
                        <div style={{marginTop: "1.5em"}}>{cartProd.product.title}</div>
                        <div>Rs. {cartProd.price}</div>
                        <div>Size: {cartProd.size}</div>
                        <div>Quantity: {cartProd.quantity}</div>
                        <FormGroup style = {{color: "black"}}>
                          <Label for="size" style={{color: "black", fontSize: "16px"}}>Size: </Label>
                          <select
                            style={{height: "1.5rem", marginTop: "0.5rem"}}
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
                          <Label for="quantity" style={{color: "black", fontSize: "16px"}}>Quantity: </Label>
                          <select
                            style={{height: "1.5rem", marginTop: "0.5rem"}}
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
                        <div style={{marginTop: "0.5rem"}}>
                          <Button className="left two-button" onClick={() => removeFromCart(cartProd.product._id, cartProd.size)}>
                            Remove
                          </Button>
                          <br/>
                          <Button className="two-button" style={{ marginTop: "0.5rem", width: "12.5rem"}} onClick={() => moveToWishList(cartProd.product._id, cartProd.size)}>
                            Move back to wishlist
                          </Button>  
                        </div>
                      </div>        
                    </div>  
                  )
                })
              ))
            ): (
              <>
                <h1 style={{marginTop: "5rem"}}>your cart is empty</h1>
                <Link to = "/wishlist"><Button>ADD FROM WISHLIST</Button></Link>
              </>    
            )}
            
            {cartData[0] && cartData[0].cart && cartData[0].cart.length>0? (
              cartData.map(cart => {
                return(
                  <>
                    <div className = "order" style={{padding: "10px"}}>
                      Order Summary
                      <div>Total Quantity: {cart.totalQuantity}</div>
                      <div>Total Price: {cart.totalPrice}</div>
                      <p>
                        <div style={{height: "100%", marginBottom: "20px"}} className="col col-complementary" role="complementary">
                          <Link to = "/wishlist"><Button style={{height: "2rem", width: "13rem", marginTop: "1rem", cursor: "pointer"}}>ADD MORE FROM WISHLIST</Button></Link><br/>
                          <Link to = "/address"><Button style={{height: "2rem", width: "13rem", marginTop: "1rem", cursor: "pointer"}}>CHECKOUT</Button></Link>
                        </div>
                      </p>  
                    </div>
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