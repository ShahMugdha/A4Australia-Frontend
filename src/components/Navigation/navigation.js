import {React, useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import {Link} from "react-router-dom";
import $ from 'jquery'
import { getProductList } from "../../redux/actions/products";
import "./navigation.css";

const Navigation = () => {
  const productData = useSelector(state => state.products.productData)
  const key = 'category';
  const productsUniqueByKey = [...new Map(productData.map(item => [item[key], item])).values()];
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getProductList())
  }, [dispatch])
  $(document).ready(function(){
    $(window).bind('scroll', function() {
    var navHeight = $( window ).height() - 70;
      if ($(window).scrollTop() > navHeight) {
        $('nav').addClass('fixed');
      }
      else {
        $('nav').removeClass('fixed');
      }
   });
  });

  return(
    <>
      {/* <HideTop/> */}
      {/* <section id="screen1"> */}
        {/* <div id="mobileNav">
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
        </div> */}
        {productsUniqueByKey ? (
          <nav>
            <ul style={{marginTop: "-8px"}}>
              {productsUniqueByKey.map((product) => {
                return(
                  <li key={product._id}><Link to = {`/product/category/${product.category}`}>{product.category}</Link></li>    
                )
              })}
            </ul>
          </nav>
        ): (
          <div className='no-results show'>
            <h5>No Items Found</h5>
          </div>
        )}
      <section/>
    </>
  )
}
export default Navigation;