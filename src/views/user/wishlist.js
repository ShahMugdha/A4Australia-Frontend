import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { getWishList, moveProductToCart, deleteProductfromWishList } from "../../redux/actions/wishlist";
import "../../components/wishlist.css"
import { Link, Redirect } from "react-router-dom";
import { FormGroup, Label, Input, Button } from "reactstrap";
import Navigation from "../../components/Navigation/navigation";
import HideTop from "../../components/Navigation/hideTop";
import { toast } from 'react-toastify';

const Wishlist = () => {
  const [size, setSize] = useState("Small")
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth)
  const wishlistData = useSelector(state => state.wishlist.wishlistData)

  useEffect(()=> {
    dispatch(getWishList())
  }, [dispatch])
  
  const moveToCart = (productId, Size) => {
    dispatch(moveProductToCart(productId, Size))
  }

  return(
    <>
      { user.isAuth ?
        <>
          <HideTop/>
          <Navigation/>
          {wishlistData? (
            <div className = "flex-container">
              {wishlistData.map(wishlist => (       
                wishlist.products.map(wishProd => {
                  return(
                    <> 
                      <div class="flex-item">
                        <div>{wishProd.title}</div>
                        <div>{wishProd.description}</div>
                        <FormGroup>
                          <Label for="size">Size:</Label>
                          <Input style={{marginLeft: "10px"}}
                            type="select"
                            name="size"
                            value = {size}
                            id={wishProd._id}
                            placeholder="Small"
                            onChange = {(e) => setSize(e.target.value)}
                          >
                            <option value="Small">Small</option>
                            <option value="Medium">Medium</option>
                            <option value="Large">Large</option>
                          </Input>
                        </FormGroup>
                        <Button onClick = {() => moveToCart(wishProd._id, size)}>Move to Cart</Button>
                      </div>
                    </>
                  )
                })
              ))}
            </div>
          ): (
            <h1>your wishlist is empty</h1>
          )}
        </>
      : <Link to="/login">Please Log In</Link> }
    </>
  );
}

export default Wishlist