import {React} from "react";
import {Link} from "react-router-dom";
import { Button } from "reactstrap";
import $ from 'jquery'
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';
import Box from '@material-ui/core/Box';
import SideNav from "./sideNav.js";
import "./hideTop.css"
import "./searchBar.css"

const HideTop = () => {
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
            <Link to = "/wishlist"><FavoriteBorderOutlinedIcon style={{color: "#333", fontSize: "25px"}}/></Link>
          </Box>
          <Box p={1}>
            <Link to = "/cart"><ShoppingCartOutlinedIcon style={{color: "#333", fontSize: "25px"}}/></Link>
          </Box>
        </Box>
      </header>
      <p><Link to = "/"><Button style={{cursor: "pointer"}}>Home</Button></Link></p>
    </>
  )
}
export default HideTop;