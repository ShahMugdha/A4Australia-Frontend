import { React, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Navigation from "../../components/Navigation/navigation.js";
import { getProductList, getParticularProduct } from "../../redux/actions/products/index.js";
import { addProductToWishList, getWishList } from "../../redux/actions/wishlist/index.js";
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { toast } from 'react-toastify'
import { MoreVertical, Filter } from 'react-feather'
import "../../components/products.css"
import { Link } from 'react-router-dom';
import { 
  Card, 
  CardBody, 
  Media, 
  Row, 
  Col, 
  Badge, 
  UncontrolledDropdown, 
  DropdownToggle, 
  DropdownMenu, 
  DropdownItem, 
  Button, 
  Label, 
  Input, 
  Form, 
  FormGroup, 
  Modal, 
  ModalBody, 
  ModalHeader, 
  ModalFooter 
} from 'reactstrap';
const Home = () => {
  let flag = 0
  const [formModal, setFormModal] = useState(false);
  const productData = useSelector(state => state.products.productData)
  const wishlistData = useSelector(state => state.wishlist.wishlistData)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getProductList())
    dispatch(getWishList())
    console.log("hello")
  }, [dispatch])

  const addToCart = (productId) => {
    setFormModal(!formModal)
    dispatch(getParticularProduct(productId))
  }

  const addToWishlist = (productId) => {
    dispatch(addProductToWishList(productId))
  }
  
  return(
    <>
      <Navigation/>
      {productData.length > 0 ? (
        <div className="main">
          <ul className="cards">
          {productData.map((product) => {
            return (
              <li className="cards_item" key = {product._id}>
                <div className="card">
                  <div className="card_image"><Link to = {`/collection/product/${product._id}`}><img src="https://picsum.photos/500/300/?image=10"/></Link></div>
                  <div className="card_content">
                    <h2 className="card_title">{product.title}</h2>
                    <p className="card_text">{product.description}</p>
                    <p style={{marginTop: "-20px", marginBottom: "15px", marginLeft: "-140px"}}>Rs.{product.price}</p>
                    <p 
                      className="wishlist_icon" 
                      style={{marginTop: "-75px", cursor: "pointer"}}
                    >
                      {wishlistData.map(wishlist => (       
                        wishlist.products.map(wishProd => {return(
                          <>
                          {wishProd._id === product._id ? flag++  : null}
                          {flag !== 0 ? <FavoriteIcon style = {{color: "#fe2c54"}}/> : <FavoriteBorderOutlinedIcon onClick={() => addToWishlist(product._id)}/>}
                          </>
                        )})
                      ))}
                      
                      
                    </p>
                    <Button
                      color="primary"
                      style={{marginTop: "45px"}}
                      onClick={() => addToCart(product._id)}
                    >
                      Add to Cart
                    </Button>
                    <Modal
                      isOpen={formModal}
                      toggle={() => setFormModal(!formModal)}
                      className="modal-dialog-centered"
                    >
                      <ModalHeader toggle={() => setFormModal(!formModal)}>
                        Add To Cart
                      </ModalHeader>
                      <ModalBody>
                        <FormGroup>
                          <Label for="password">Access Level:</Label>
                          <Input
                            type="select"
                            name="status"
                            id="status"
                            placeholder="Employee"
                          >
                            <option value="admin">Admin</option>
                            <option value="author">Manager</option>
                            <option value="editor">Employee</option>
                          </Input>
                        </FormGroup>
                        <FormGroup>
                          <Label for="name">Job Title:</Label>
                          <Input
                            type="text"
                            id="jobTitle"
                            placeholder="Store Manager, Admin"
                          />
                        </FormGroup>
                      </ModalBody>
                      <ModalFooter>
                        <Button
                          color="primary"
                          onClick={() => setFormModal(!formModal)}
                        >
                          Add To Cart
                        </Button>{" "}
                      </ModalFooter>
                    </Modal>
                  </div>
                </div>
              </li>   
            )
          })}
          </ul>
        </div>
      ) : (
        <h1> Products not available</h1>
      )}
      <h3 className="made_by">Made with ♡</h3>
    </>
  );
};
export default Home;