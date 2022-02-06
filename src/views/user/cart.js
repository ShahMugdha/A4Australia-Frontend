import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { Link, useHistory } from "react-router-dom";
import { FormGroup, Label, Button } from "reactstrap";
import HideTop from "../../components/Navigation/hideTop.js";
import Footer from "../../components/footer.js";
import { getParticularProductInventory } from "../../redux/actions/inventory/index.js";
import { getCartList, updateProductQuantity, updateProductSize, moveProductToWishList, deleteProductFromCart } from "../../redux/actions/cart/index.js";
import "../../components/cart.css";
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'; 
toast.configure() 

const Cart = () => {
  const dispatch = useDispatch();
  const history = useHistory()
  const user = localStorage.getItem("token")
  const cartData = useSelector(state => state.cart.cartData)
  const productInventory = useSelector(state => state.inventory.productInventory && state.inventory.productInventory.stock? state.inventory.productInventory.stock: null )
  const [size, setSize] = useState("size")
  const [quantity, setQuantity] = useState(1)

  const changeSize = (event, productId, originalSize, updatedSize) => {
    setSize(event.target.value)
    dispatch(getParticularProductInventory(productId, updatedSize))
    if(productInventory && productInventory[0] && productInventory[0].quantity>=1) {
      dispatch(updateProductSize(productId, originalSize, updatedSize))
    }
    else toast.error("Size not available!", {autoClose:2000})
  }

  const changeQuantity = (productId, Size) => {
    console.log(quantity, productInventory && productInventory[0] && productInventory[0].quantity && productInventory[0].quantity ? productInventory[0].quantity : 0, "quantity")
    if(quantity <= 0) {
      toast.error("Please enter a valid quantity", {autoClose:2000})
    }
    else {
      dispatch(getParticularProductInventory(productId, Size))
      if(productInventory && productInventory[0] && productInventory[0].quantity && productInventory[0].quantity>=quantity) {
        dispatch(updateProductQuantity(productId, Size, quantity))
      }
      else toast.error("Quantity not available!", {autoClose:2000})
    }
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

  const checkInventory = (e) => {
    var count = 0;
    if(cartData && cartData[0] && cartData[0].cart) {
      cartData[0].cart.forEach(cartProd => {
        dispatch(getParticularProductInventory(cartProd.productCart._id, cartProd.size))
        if(productInventory && productInventory[0] && productInventory[0].quantity && productInventory[0].quantity >= cartProd.quantity) {
          count++;
        }
        else toast.error(`${cartProd.productCart.title} in size ${cartProd.size} out of stock!`, {autoClose:3000})
      })
      console.log(count, "count")
      if(count === cartData[0].cart.length) history.push('/address')
      e.preventDefault()
    }
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
                        <img style={{height: "20rem", width: "200px"}} src={`http://localhost:5000/${cartProd.productCart.image}`} alt=''/>
                      </div>
                      <div className="cart-right">
                        <div style={{marginTop: "1.5em"}}>{cartProd.productCart.title}</div>
                        <div>Rs. {cartProd.price}</div>
                        <div>Size: {cartProd.size}</div>
                        <div>Quantity: {cartProd.quantity}</div>
                        <FormGroup style = {{color: "black"}}>
                          <Label for="size" style={{color: "black", fontSize: "16px"}}> Update Size: </Label>
                          <select
                            style={{height: "1.5rem", marginTop: "0.5rem"}}
                            type="select"
                            name="size"
                            value = {size}
                            onChange = {(e) => changeSize(e, cartProd.productCart._id, cartProd.size, e.target.value)}
                          >
                            <option value="Small">Small</option>
                            <option value="Medium">Medium</option>
                            <option value="Large">Large</option>
                          </select>
                        </FormGroup>
                        <FormGroup style = {{color: "black"}} role="complementary">
                          <Label for="quantity" style={{color: "black", fontSize: "16px"}}> Update Quantity: </Label>
                          <input 
                            type="number" style={{height: "1.5rem", marginTop: "0.5rem", width: "2.7rem"}} 
                            value = {quantity} onChange = {(e) => setQuantity(e.target.value)}
                          />
                          <Button className="setQuan" onClick = {() => changeQuantity(cartProd.productCart._id, cartProd.size)}>Set Quantity</Button>
                        </FormGroup>
                        <div style={{marginTop: "0.5rem"}}>
                          <Button className="left two-button" onClick={() => removeFromCart(cartProd.productCart._id, cartProd.size)}>
                            Remove
                          </Button>
                          <br/>
                          <Button className="two-button" style={{ marginTop: "0.5rem", width: "12.5rem"}} onClick={() => moveToWishList(cartProd.productCart._id, cartProd.size)}>
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
                <Link to = "/wishlist"><Button className="left two-button">ADD FROM WISHLIST</Button></Link>
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
                          <Button style={{height: "2rem", width: "13rem", marginTop: "1rem", cursor: "pointer"}} onClick={(e) => checkInventory(e)}>CHECKOUT</Button>
                        </div>
                      </p>  
                    </div>
                  </> 
                )
              })
            ): (
              <></>
            )}    
          </div>
        </> 
      : <Link to="/login">Please Log In</Link> } 
      <Footer/>
    </>
  );
}

export default Cart