import {React, useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import $ from 'jquery'
import {Link} from "react-router-dom";
import "./sideNav.css"

const SideNav = () => {
 /*  var coll = document.getElementsByClassName("collapsible");
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
  } */
  var sidebar = (function() {
    "use strict";

    var $contnet         = $('#content'),
        $sidebar         = $('#sidebar'),
        $sidebarBtn      = $('#sidebar-btn'),
        $toggleCol       = $('body').add($contnet).add($sidebarBtn),
        sidebarIsVisible = false;

    $sidebarBtn.on('click', function() {

        if (!sidebarIsVisible) {
            bindContent();
        } else {
            unbindContent();
        }

        toggleMenu();
    });


    function bindContent() {

        $contnet.on('click', function() {
            toggleMenu();
            unbindContent();
        });
    }

    function unbindContent() {
        $contnet.off();
    }

    function toggleMenu() {

        $toggleCol.toggleClass('sidebar-show');
        $sidebar.toggleClass('show');

        if (!sidebarIsVisible) {
            sidebarIsVisible = true;
        } else {
            sidebarIsVisible = false;
        }
    }


    var $menuToggle = $sidebar.find('.menu-toggle');

    $menuToggle.each(function() {

        var $this       = $(this),
            $submenuBtn = $this.children('.menu-toggle-btns').find('.menu-btn'),
            $submenu    = $this.children('.submenu');

        $submenuBtn.on('click', function(e) {
            e.preventDefault();
            $submenu.slideToggle();
            $(this).toggleClass('active');
        });
    });

})();
  return(
    <>
      {/* <nav role="navigation">
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
          </ul>
        </div>
      </nav> */}
      <button id="sidebar-btn" className="sidebar-btn" style={{backgroundColor: "transparent", border: "white"}}>
    <div className="menu-stripes"></div>
    <div className="menu-stripes"></div>
    <div className="menu-stripes"></div>
</button>
<section id="sidebar" className="sidebar">
    <div className="pad-dbl">
        <h1>Sidebar</h1>
        <h2>Navigation</h2>
        <div className="menu">
        <ul className="menu-level1 no-style">
            <li className="menu-toggle">
                <div className="menu-toggle-btns">
                    <a href="#" className="menu-link">Link on Level 1</a>
                    <a href="#" className="menu-btn"><div>+</div></a>
                </div>
                <ul className="menu-level2 submenu no-style">
                    <li className="menu-toggle">
                        <div className="menu-toggle-btns">
                            <a href="#" className="menu-link">Link on Level 2</a>
                            <a href="#" className="menu-btn"><div>+</div></a>
                        </div>
                        <ul className="menu-level3 submenu no-style">
                            <li><a href="#" className="menu-link">Link on Level 3</a></li>
                            <li><a href="#" className="menu-link">Link on Level 3</a></li>
                        </ul>
                    </li>
                    <li><a href="#" className="menu-link">Link on Level 2</a></li>
                    <li><a href="#" className="menu-link">Link on Level 2</a></li>
                </ul>
            </li>
            <li className="menu-toggle">
                <div className="menu-toggle-btns">
                    <a href="#" className="menu-link">Link on Level 1</a>
                    <a href="#" className="menu-btn"><div>+</div></a>
                </div>
                <ul className="menu-level2 submenu no-style">
                    <li><a href="#" className="menu-link">Link on Level 2</a></li>
                    <li><a href="#" className="menu-link">Link on Level 2</a></li>
                    <li><a href="#" className="menu-link">Link on Level 2</a></li>
                    <li><a href="#" className="menu-link">Link on Level 2</a></li>
                </ul>
            </li>
            <li>
                <a href="#" className="menu-link">Link on Level 1</a>
            </li>
        </ul>
    </div>
    </div>
    
</section>
<div id="content" className="content">
    <div className="wrapper">
        <main className="container">
            <div style={{height: "2000px"}}></div>
        </main>
    </div>
</div>
    </>
  )
}
export default SideNav;