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
      {/* <section/> */}
    </>
  )
}
export default Navigation;