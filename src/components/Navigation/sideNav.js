import {React, useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import {Link} from "react-router-dom";
import "./sideNav.css"

const SideNav = () => {
  var coll = document.getElementsByClassName("collapsible");
  var i;
  for (i = 0; i < coll.length; i++) {
    coll[i].addEventListener("click", function() {
      this.classList.toggle("active");
      var content = this.nextElementSibling;
      if (content.style.maxHeight){
        content.style.maxHeight = null;
      } else {
        content.style.maxHeight = content.scrollHeight + "px";
      } 
    });
  }
  return(
    <>
      <nav role="navigation">
        <div id="menuToggle">
   
          <input type="checkbox"/>
          
          <span></span>
          <span></span>
          <span></span>
    
          <ul id="menu">
            <a href="#">
              <li>
                <button className="collapsible">
                  Men
                </button>  
                <ul id="menu">
                  <a href="#">
                    <li>
                      <div className="content">
                        <p>sub cat 1</p>
                      </div>
                    </li>
                  </a>
                </ul>
              </li> 
            </a>
            {/* <a href="#">
              <li>
                <button className="collapsible">
                  Women
                </button>  
                <ul id="menu">
                  <a href="#">
                    <li>
                      <div className="content">
                        <p>sub cat 2</p>
                      </div>
                    </li>
                  </a>
                </ul>
              </li> 
            </a> */}
          </ul>
        </div>
      </nav>
    </>
  )
}
export default SideNav;