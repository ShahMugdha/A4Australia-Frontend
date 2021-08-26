import {React, useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import {Link} from "react-router-dom";
import $ from 'jquery'
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import SearchIcon from '@material-ui/icons/Search';
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';
import Box from '@material-ui/core/Box';
import SideNav from "./sideNav.js";
import "./hideTop.css"

const HideTop = () => {
  /* const [position, setPosition] = useState(window.pageYOffset)
    const [visible, setVisible] = useState(true) 
    useEffect(()=> {
        const handleScroll = () => {
           let moving = window.pageYOffset
           
           setVisible(position > moving);
           setPosition(moving)
        };
        window.addEventListener("scroll", handleScroll());
        return(() => {
           window.removeEventListener("scroll", handleScroll());
        })
    })
  const cls = visible ? "visible" : "hidden"; */
  $(document).ready(function(){
    $(window).bind('scroll', function() {
    var navHeight = $( window ).height() - 70;
      if ($(window).scrollTop() > navHeight) {
        $('header').addClass('fixed');
      }
      else {
        $('header').removeClass('fixed');
      }
   });
  });

  
  return(
    <>
      <div style={{position: "absolute", top: "19px", left: "0px"}}>
        <SideNav/>
      </div>
      <header style={{position: "absolute", top: "5px", right: "-10px"}}>
        <Box display="flex" flexDirection="row" p={1} m={1}>
          <Box p={1}>
            <Link to = "/profile"><AccountCircleOutlinedIcon style={{color: "#333", fontSize: "25px"}}/></Link>
          </Box>
          <Box p={1}>
            <SearchIcon style={{fontSize: "25px"}}/>
          </Box>
          <Box p={1}>
            <Link to = "/wishlist"><FavoriteBorderOutlinedIcon style={{color: "#333", fontSize: "25px"}}/></Link>
          </Box>
          <Box p={1}>
            <Link to = "/cart"><ShoppingCartOutlinedIcon style={{color: "#333", fontSize: "25px"}}/></Link>
          </Box>
        </Box>
      </header>
      <p><Link to = "/">A For Australia</Link></p>
    </>
  )
}
export default HideTop;