import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { getWishList, moveProductToCart, deleteProductFromWishList } from "../../redux/actions/wishlist";
import "../../components/wishlist.css"
import { Link } from "react-router-dom";
import { FormGroup, Label, Input, Button } from "reactstrap";
import Footer from "../../components/footer";
import CloseIcon from '@material-ui/icons/Close';
import HideTop from "../../components/Navigation/hideTop";

const Wishlist = () => {
  const [size, setSize] = useState("Small")
  const dispatch = useDispatch();
  const user = localStorage.getItem("token")
  const wishlistData = useSelector(state => state.wishlist.wishlistData)

  useEffect(()=> {
    dispatch(getWishList())
  }, [dispatch])
  
  const moveToCart = (productId, Size) => {
    dispatch(moveProductToCart(productId, Size))
  }
  const handleDelete = (productId) => {
    dispatch(deleteProductFromWishList(productId))
    setTimeout(function() {
      window.location.reload();
    }, 5000);
  }

  return(
    <>
      { user ?
        <> 
          <HideTop/>
          {wishlistData && wishlistData.length > 0? (
            <div className = "flex-container" style={{marginTop: "5%"}}>
              {wishlistData.map(wishlist => (       
                wishlist.products.map(wishProd => {
                  return(
                    <> 
                      <div className="flex-item">
                        <CloseIcon style={{float: "right", cursor: "pointer"}} onClick={() => handleDelete(wishProd._id)}/>
                        <div><img style={{height: "250px", width: "200px"}} src={`http://localhost:5000/${wishProd.image}`} alt=''/></div>
                        <div style={{fontSize: "20px"}}>{wishProd.title}</div>
                        <div style={{fontSize: "15px"}}>{wishProd.description}</div>
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
                        <Button className="cart-button" onClick = {() => moveToCart(wishProd._id, size)}>Move to Cart</Button>
                      </div>
                    </>
                  )
                })
              ))}
            </div>
          ): (
            <h1 style={{marginTop: "8rem"}}>your wishlist is empty</h1>
          )}
        </>
      : <Link to="/login">Please Log In</Link> } 
      <Footer/>
    </>
  );
}

export default Wishlist