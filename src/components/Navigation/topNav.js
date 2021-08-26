import {React, useEffect} from "react";
import {Link} from "react-router-dom";
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import ArrowLeftIcon from '@material-ui/icons/ArrowLeft';
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import $ from 'jquery';
import { getProductByCategory } from "../../redux/actions/products";
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
        <nav className="top">
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