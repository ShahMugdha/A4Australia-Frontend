import {React} from "react";
import {Link} from "react-router-dom";
import "./footer.css";

const Footer = () => {
  return(
    <>
      <footer className="footer">
        <div className="footer__addr">
          <h1 className="footer__logo">A4AUSTRALIA</h1>
              
          <h2>Contact</h2>
          
          <address>
            Melbourne<br/>
                
            <a className="footer__btn" href="mailto:pateljalpa181993@gmail.com">Email Us</a>
          </address>
        </div>
        
        <ul className="footer__nav">
          <li className="nav__item">
            <h2 className="nav__title">Category</h2>

            <ul className="nav__ul">
              <li>
              <Link to = "/product/category/Men" >Men</Link>
              </li>

              <li>
              <Link to = "/product/category/Women" >Women</Link>
              </li>
                  
              <li>
                <Link to = "/product/category/Boys" >Boys</Link>
              </li>
  
              <li>
                <Link to = "/product/category/Girls" >Girls</Link>
              </li>
              <li>
                <Link to = "/product/category/Unisex" >Unisex</Link>
              </li>
            </ul>
          </li> 
          <li className="nav__item">
            <h2 className="nav__title">Legal</h2>
            
            <ul className="nav__ul">
              <li>
                <a href="#">Privacy Policy</a>
              </li>
              
              <li>
                <a href="#">Terms of Use</a>
              </li>
              
              <li>
                <a href="#">Sitemap</a>
              </li>
            </ul>
          </li>
        </ul>
        
        <div className="legal">
          <p>&copy; 2019 Something. All rights reserved.</p>
          
          <div className="legal__links">
            <span>Made with <span className="heart">♥</span></span>
          </div>
        </div>
      </footer>
    </>
  )
}
export default Footer;