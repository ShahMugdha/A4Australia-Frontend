import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { getParticularProduct } from "../../redux/actions/products";
import { Link, Redirect, useParams } from "react-router-dom";
import HideTop from "../../components/Navigation/hideTop";
import Footer from "../../components/footer.js";
import "../../components/productDetail.css"

const ProductDetail = () => {
  const imgs = document.querySelectorAll('.img-select a');
  const imgBtns = [...imgs];
  let imgId = 1;

  imgBtns.forEach((imgItem) => {
      imgItem.addEventListener('click', (event) => {
          event.preventDefault();
          imgId = imgItem.dataset.id;
          slideImage();
      });
  });

  function slideImage(){
      const displayWidth = document.querySelector('.img-showcase img:first-child').clientWidth;

      document.querySelector('.img-showcase').style.transform = `translateX(${- (imgId - 1) * displayWidth}px)`;
  }

  window.addEventListener('resize', slideImage);
  const dispatch = useDispatch();
  const {productId} = useParams()
  console.log(productId, "id")
  useEffect(()=> {
    dispatch(getParticularProduct(productId))
  }, [dispatch])

  const product = useSelector(state => state.products.particularProduct)

  return(
    <>
      <HideTop/>
      <div className = "card-wrapper">
        <div className = "card">
          <div className = "product-imgs">
            <div className = "img-display">
              <div className = "img-showcase">
                <img src = "https://fadzrinmadu.github.io/hosted-assets/product-detail-page-design-with-image-slider-html-css-and-javascript/shoe_1.jpg" alt = "shoe image"/>
                <img src = "https://fadzrinmadu.github.io/hosted-assets/product-detail-page-design-with-image-slider-html-css-and-javascript/shoe_2.jpg" alt = "shoe image"/>
                <img src = "https://fadzrinmadu.github.io/hosted-assets/product-detail-page-design-with-image-slider-html-css-and-javascript/shoe_3.jpg" alt = "shoe image"/>
                <img src = "https://fadzrinmadu.github.io/hosted-assets/product-detail-page-design-with-image-slider-html-css-and-javascript/shoe_4.jpg" alt = "shoe image"/>
              </div>
            </div>
            <div className = "img-select">
              <div className = "img-item">
                <a href = "#" data-id = "1">
                  <img src = "https://fadzrinmadu.github.io/hosted-assets/product-detail-page-design-with-image-slider-html-css-and-javascript/shoe_1.jpg" alt = "shoe image"/>
                </a>
              </div>
              <div className = "img-item">
                <a href = "#" data-id = "2">
                  <img src = "https://fadzrinmadu.github.io/hosted-assets/product-detail-page-design-with-image-slider-html-css-and-javascript/shoe_2.jpg" alt = "shoe image"/>
                </a>
              </div>
              <div className = "img-item">
                <a href = "#" data-id = "3">
                  <img src = "https://fadzrinmadu.github.io/hosted-assets/product-detail-page-design-with-image-slider-html-css-and-javascript/shoe_3.jpg" alt = "shoe image"/>
                </a>
              </div>
              <div className = "img-item">
                <a href = "#" data-id = "4">
                  <img src = "https://fadzrinmadu.github.io/hosted-assets/product-detail-page-design-with-image-slider-html-css-and-javascript/shoe_4.jpg" alt = "shoe image"/>
                </a>
              </div>
            </div>
          </div>
          <div className = "product-content">
            <h2 className = "product-title">{product.title}</h2>

            <div className = "product-price">
              <p className = "new-price">Price: <span>Rs. {product.price}</span></p>
            </div>

            <div className = "product-detail">
              <h2>about this item: </h2>
              <p>{product.description}</p>
              <ul>
                <li>Color: <span>Black</span></li>
                <li>Available: <span>in stock</span></li>
                <li>Category: <span>{product.category}</span></li>
                <li>Sub Category: <span>{product.subCategory}</span></li>
                <li>Shipping Area: <span>All over the world</span></li>
                <li>Shipping Fee: <span>Free</span></li>
              </ul>
            </div>

            <div className = "purchase-info">
              <button type = "button" className = "btn">
                Add to Cart <i className = "fas fa-shopping-cart"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer/>
    </>
  );
}

export default ProductDetail