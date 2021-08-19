import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { getWishList, moveProductToCart, deleteProductfromWishList } from "../../redux/actions/wishlist";
import "../../components/wishlist.css"
import { Link, Redirect } from "react-router-dom";
import { FormGroup, Label, Input } from "reactstrap";
import Navigation from "../../components/Navigation/navigation";
import HideTop from "../../components/Navigation/hideTop";

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
      { user.isAuth ? null : <Link to="/login" /> }
      <HideTop/>
      <Navigation/>
      {wishlistData? (
        <section className="section-subscribe">
          <div className="w-row">
          {wishlistData.map(wishlist => (       
            wishlist.products.map(wishProd => {
              return(
                <> 
                  <div className="w-card" key={wishProd._id}>
                    <div className="w-card__left-side">
                      <img src="//unsplash.it/250/305/" alt="" className="w-card__img"/>
                    </div>
                    <div className="w-card__right-side">
                      <h2 className="w-card__title">{wishProd.title}</h2>
                      <p className="w-card__text">
                        {wishProd.description}
                      </p>
                      <div className="w-card__form">
                        <div className="w-card__box">
                        <FormGroup style = {{marginLeft: "-20rem", color: "aliceblue", marginTop: "40px"}} >
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
                          <button className="w-card__button" onClick = {() => moveToCart(wishProd._id, size)}>Move to Cart</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )
            })
          ))}
          </div> 
        </section>
      ): (
        <h1>your wishlist is empty</h1>
      )}
    </>
  );
}

export default Wishlist