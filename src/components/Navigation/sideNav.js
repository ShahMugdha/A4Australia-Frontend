import {React} from "react";
import $ from 'jquery'
import {Link} from "react-router-dom";
import "./sideNav.css"

const SideNav = () => {
  var sidebar = (() => {
    var $contnet = $('#content'),
    $sidebar = $('#sidebar'),
    $sidebarBtn = $('#sidebar-btn'),
    $toggleCol = $('body').add($contnet).add($sidebarBtn),
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
      var $this = $(this),
      $submenuBtn = $this.children('.menu-toggle-btns').find('.menu-btn'),
      $submenu = $this.children('.submenu');
      $submenuBtn.on('click', function(e) {
        e.preventDefault();
        $submenu.slideToggle();
        $(this).toggleClass('active');
      });
    });
  })();
  return(
    <>
      <button id="sidebar-btn" className="sidebar-btn" style={{backgroundColor: "transparent", border: "white", cursor: "pointer"}}>
        <div className="menu-stripes"></div>
        <div className="menu-stripes"></div>
        <div className="menu-stripes"></div>
      </button>
    <section id="sidebar" className="sidebar">
        <div className="pad-dbl">
            <h1></h1>
            <h2></h2>
            <br/><br/>
            <div className="menu">
            <ul className="menu-level1 no-style">
                <li className="menu-toggle">
                    <div className="menu-toggle-btns">
                        <Link to = "/product/category/Men" className="menu-link">Men</Link>
                    </div>
                </li>
                <li className="menu-toggle">
                    <div className="menu-toggle-btns">
                        <Link to = "/product/category/Women" className="menu-link">Women</Link>
                    </div>
                </li>
                <li>
                  <Link to = "/product/category/Girls" className="menu-link">Girls</Link>
                </li>
                <li>
                  <Link to = "/product/category/Boys" className="menu-link">Boys</Link>
                </li>
                <li>
                  <Link to = "/product/category/Unisex" className="menu-link">Unisex</Link>
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