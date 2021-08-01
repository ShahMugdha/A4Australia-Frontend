import {React, useEffect} from "react";
import {Link} from "react-router-dom";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import SearchIcon from '@material-ui/icons/Search';
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';
import { getProductByCategory } from "../../redux/actions/products";
import Box from '@material-ui/core/Box';
import "./topNav.css";

const TopNavigation = () => {
  const {category} = useParams()
  const productData = useSelector(state => state.products.productsByCategory)
  const key = 'subCategory';
  const productsUniqueByKey = [...new Map(productData.map(item => [item[key], item])).values()];
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getProductByCategory(category))
  }, [dispatch])
  return(
    <>
      <div id="mobileNav">
        <input type="checkbox" id="top-nav" />
        <span style={{marginTop: "20px", marginLeft: "20px"}} className="hamburgerspan"></span>
        <span style={{marginTop: "4px", marginLeft: "20px"}} className="hamburgerspan"></span>
        <span style={{marginTop: "4px", marginLeft: "20px"}} className="hamburgerspan"></span>
        <div id="menu-cont-1">
          <ul className="menu-ul">
            <li className="nav-item"> item 1</li>
            <li className="nav-item sub-menu"> Women
              <input type="checkbox" id="menu-1"/>
              <div id="menu-cont-2">
                <ul className="menu-ul">
                  <label className="menu-label" for="menu-1">Women</label>
                  <li className="nav-item">Tops</li>
                  <li className="nav-item">Jeans</li>
                  <li className="nav-item">Boots</li>
                  <li className="nav-item">Mufflers</li>
                </ul>
              </div>
            </li>
            <li className="nav-item"> item 3</li>
            <li className="nav-item"> item 4</li>
            <li className="nav-item"> item 5</li>
          </ul>
        </div>  
      </div>
      <div style={{position: "absolute", top: "10px", right: "20px"}}>
        <Box display="flex" flexDirection="row" p={1} m={1}>
          <Box p={1}>
            <Link to = "/profile"><AccountCircleOutlinedIcon style={{color: "#333"}}/></Link>
          </Box>
          <Box p={1}>
            <SearchIcon/>
          </Box>
          <Box p={1}>
            <Link to = "/wishlist"><FavoriteBorderOutlinedIcon style={{color: "#333"}}/></Link>
          </Box>
          <Box p={1}>
            <Link to = "/cart"><ShoppingCartOutlinedIcon style={{color: "#333"}}/></Link>
          </Box>
        </Box>
      </div>
      <p>A For Australia</p>
      {productsUniqueByKey ? (
        <nav>
          <ul style={{marginTop: "-8px"}}>
            {productsUniqueByKey.map((product) => {
              return(
                <li key={product._id}><Link to = {`/product/${product.category}/${product.subCategory}`}>{product.subCategory}</Link></li>    
              )
            })}
          </ul>
        </nav>
      ): (
        <div className='no-results show'>
          <h5>No Items Found</h5>
        </div>
      )}
    </>
  )
}
export default TopNavigation;