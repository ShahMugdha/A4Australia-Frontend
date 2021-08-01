import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { getWishList } from "../../redux/actions/wishlist";
import "../../components/wishlist.css"
import { Link, Redirect } from "react-router-dom";
import { FormGroup, Label, Input } from "reactstrap";

const Wishlist = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth)
  const wishlistData = useSelector(state => state.wishlist.wishlistData)
  useEffect(()=> {
    dispatch(getWishList())
  }, [dispatch])

  return(
    <>
      { user.isAuth ? null : <Link to="/login" /> }
      {wishlistData.length > 0 ? (
        <section className="section-subscribe">
          <div className="row">
          {wishlistData.map(wishlist => (       
            wishlist.products.map(wishProd => {
              return(
                <> 
                  <a href="#" className="card">
                    <div className="card__left-side">
                      <img src="//unsplash.it/250/305/" alt="" className="card__img"/>
                    </div>
                    <div className="card__right-side">
                      <h2 className="card__title">{wishProd.title}</h2>
                      <p className="card__text">
                        {wishProd.description}
                      </p>
                      <form action="#" className="card__form">
                        <div className="card__box">
                        <FormGroup>
                          <Label for="password">Size:</Label>
                          <Input
                            type="select"
                            name="status"
                            id="status"
                            placeholder="Employee"
                          >
                            <option value="Small">Small</option>
                            <option value="Medium">Medium</option>
                            <option value="Large">Large</option>
                          </Input>
                        </FormGroup>
                          <button className="card__button">Add to Cart</button>
                        </div>
                      </form>
                    </div>
                  </a>
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