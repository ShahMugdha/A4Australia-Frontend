import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { Link, useHistory } from "react-router-dom";
import { FormGroup, Label, Button } from "reactstrap";
import HideTop from "../../components/Navigation/hideTop.js";
import Footer from "../../components/footer.js";
import { getInventoryList } from "../../redux/actions/inventory/index.js";
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
  const inventoryData = useSelector(state => state.inventory.inventoryData)
  const [size, setSize] = useState("size")
  const [quantity, setQuantity] = useState(1)
  let checkOutProducts = []
  let objToAdd = {}
  let stockToAddSize = {}
  let stockToAddQuantity = {}

  if(cartData && cartData[0] && cartData[0].cart) {
    inventoryData.map(inventory => {
      cartData[0].cart.map(cart => {
        if(cart.product._id === inventory.product._id) {
          inventory.stock.map(stock => {
            if(cart.size === stock.size && cart.quantity <= stock.quantity) {
              objToAdd = {productId: cart.product._id}
              checkOutProducts = [...checkOutProducts, objToAdd]
            }
          })
        }
      })
    })
  }
  console.log(checkOutProducts)

  const sizeCheck = (productId, upSize, cartQuan) => {
    inventoryData.map(inventory => {
      if(inventory.product._id === productId) {
        inventory.stock.map(stock => {
          if(stock.size === upSize && stock.quantity >= cartQuan) {
            stockToAddSize = {productId: inventory.product._id, size: stock.size, quantity: cartQuan }
          }
        })
      }
    })
  }

  const sizeQuantityCheck = (productId, size) => {
    inventoryData.map(inventory => {
      if(inventory.product._id === productId) {
        inventory.stock.map(stock => {
          if(stock.size === size && stock.quantity >= quantity) {
            stockToAddQuantity = {productId: inventory.product._id, size: stock.size, quantity }
          }
        })
      }
    })
  }

  const changeSize = (event, productId, originalSize, updatedSize, cartQuantity) => {
    if(updatedSize === originalSize) {
      toast.error("Size already selected", {autoClose:2000})
    }
    else {
      setSize(event.target.value)
      sizeCheck(productId, updatedSize, cartQuantity)
      if(stockToAddSize.size === updatedSize && stockToAddSize.quantity === cartQuantity) {
        console.log("size updated")
        dispatch(updateProductSize(productId, originalSize, updatedSize))
      }
      else toast.error("Size not available in this quantity!", {autoClose:2000})
    }
  }

  const changeQuantity = (productId, Size) => {
    if(quantity <= 0) {
      toast.error("Please enter a valid quantity", {autoClose:2000})
    }
    else {
      sizeQuantityCheck(productId, Size)
      if(stockToAddQuantity.size === Size && stockToAddQuantity.quantity === quantity) {
        console.log("quantity updated")
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
    let count = 0, i=0;
    if(cartData && cartData[0] && cartData[0].cart) {
      cartData[0].cart.forEach(cartProd => {
        if(checkOutProducts[i] && cartProd.product._id === checkOutProducts[i].productId) {
          console.log(cartProd.product._id, i, "right")
          count++
          i++
        }
        else {
          toast.error(`${cartProd.product.title} in size ${cartProd.size} out of stock!`, {autoClose:3000})
          console.log(cartProd.product._id, i, "wrong")
          i=0
        }
      })
      if(count && cartData[0].cart.length) {
        if (count == cartData[0].cart.length) history.push('/address')
      }
      else {
        console.log("no")
        e.preventDefault()
      }
    }
    console.log(count, cartData[0].cart.length, "count")
  }

  useEffect(()=> {
    dispatch(getCartList())
    dispatch(getInventoryList())
  }, [dispatch])

  return(
    <>
      { user ?
        <> 
          <HideTop/>
          <div style={{marginTop: "8%"}}>
            {cartData && cartData[0] && cartData[0].cart && cartData[0].cart.length>0 ? (
              cartData.map(cart => (       
                cart.cart.map(cartProd => {
                  return(
                    <div className="cart-container">
                      <div className="cart-left">
                        <img style={{height: "20rem", width: "200px"}} src={`http://localhost:5000/${cartProd.product.image}`} alt=''/>
                      </div>
                      <div className="cart-right">
                        <div style={{marginTop: "1.5em"}}>{cartProd.product.title}</div>
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
                            onChange = {(e) => changeSize(e, cartProd.product._id, cartProd.size, e.target.value, cartProd.quantity)}
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
                          <Button className="setQuan" onClick = {() => changeQuantity(cartProd.product._id, cartProd.size)}>Set Quantity</Button>
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
                <Link to = "/wishlist"><Button className="left two-button">ADD FROM WISHLIST</Button></Link>
              </>    
            )}
            
            {cartData && cartData[0] && cartData[0].cart && cartData[0].cart.length>0? (
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