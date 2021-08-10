import {React, useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import {Link} from "react-router-dom";
import $ from 'jquery'
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import SearchIcon from '@material-ui/icons/Search';
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';
import Box from '@material-ui/core/Box';
import SideNav from "./sideNav.js";

const HideTop = () => {
  var prevScrollpos = window.pageYOffset;
  window.onscroll = function() {
  var currentScrollPos = window.pageYOffset;
    if (prevScrollpos > currentScrollPos) {
      document.getElementById("hideTop").style.top = "0px";
    } else {
      document.getElementById("hideTop").style.top = "-50px";
    }
    prevScrollpos = currentScrollPos;
  }
  return(
    <>
      <div style={{position: "absolute", top: "19px", left: "0px"}} id = "hideTop">
        <SideNav/>
      </div>
      <div style={{position: "absolute", top: "5px", right: "20px"}} id = "hideTop">
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
      </div>
      <p><Link to = "/">A For Australia</Link></p>
    </>
  )
}
export default HideTop;