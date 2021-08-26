import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { Link, Redirect } from "react-router-dom";
import { FormGroup, Label, Button, Input} from "reactstrap";
import Navigation from "../../components/Navigation/navigation.js"
import HideTop from "../../components/Navigation/hideTop.js";
import { getCartList, updateProductQuantity, updateProductSize, moveProductToWishList, deleteProductFromCart } from "../../redux/actions/cart/index.js";
import "../../components/cart.css"

const Cart = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth)
  const cartData = useSelector(state => state.cart.cartData)
  const [size, setSize] = useState("size")
  const [quantity, setQuantity] = useState(1)

  const changeSize = (productId, originalSize, updatedSize) => {
    dispatch(updateProductSize(productId, originalSize, updatedSize))
  }

  const changeQuantity = (productId, size, quantity) => {
    dispatch(updateProductQuantity(productId, size, quantity))
  }

  const removeFromCart = () => {
    dispatch(deleteProductFromCart())
  }

  const moveToWishList = () => {
    dispatch(moveProductToWishList())
  }

  const sizeOptions = [
    { value: 'Small', label: 'Small' },
    { value: 'Medium', label: 'Medium' },
    { value: 'Large', label: 'Large' },
  ];

  useEffect(()=> {
    dispatch(getCartList())
  }, [dispatch])

  return(
    <>
      { user.isAuth ? null : <Link to="/login" /> }
      <HideTop/>
      <div className="cartprod">
      
        {cartData? (
          cartData.map(cart => (       
            cart.cart.map(cartProd => {
              return(
                <div className="layout">
                  <p className="col col-main">
                    <div style={{display: "flex", flexDirection: "column", height: "100%", boxSizing: "border-box", border: "solid pink 1px", marginBottom: "20px", textAlign: "left", padding: "2rem"}}>
                      <div>{cartProd.product.title}</div>
                      <div>Rs. {cartProd.price}</div>
                      <div>Size: {cartProd.size}</div>
                      <div>Quantity: {cartProd.quantity}</div>
                      {/* <div className="layout"> */}
                        <FormGroup style = {{color: "black"}} className="left">
                          <Label for="size" style={{color: "black"}}>Size: </Label>
                          <Input
                            type="select"
                            name="size"
                            value = {size}
                            /* id={cartProd.product._id} */
                            onChange = {(e) => setSize(e.target.value)}
                          >
                            <option value="Small">Small</option>
                            <option value="Medium">Medium</option>
                            <option value="Large">Large</option>
                          </Input>
                        </FormGroup>
                        <FormGroup style = {{color: "black"}} role="complementary">
                          <Label for="quantity" style={{color: "black"}}>Quantity: </Label>
                          <Input
                            type="select"
                            name="quantity"
                            value = {quantity}
                            /* id={cartProd.product._id} */
                            onChange = {(e) => setQuantity(e.target.value)}
                          >
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                          </Input>
                        </FormGroup>
                      {/* </div> */}
                      <div className="layout" style={{marginTop: "0.5rem"}}>
                        <button className="left">
                          Remove
                        </button>
                        <button role="complementary" style={{marginLeft: "0.5rem"}}>
                          Move back to wishlist
                        </button>
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
  );
}

export default Cart