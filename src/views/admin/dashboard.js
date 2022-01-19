import { React } from "react";
import { useDispatch } from "react-redux";
import { logOut } from "../../redux/actions/auth";
import "../../components/admin/navSide.css";
import AccessDenied from "../../components/error-pages/accessDenied.js"
import jwt_decode from "jwt-decode";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const adminToken = localStorage.getItem("token")
  var role
  if(adminToken) {
    role = jwt_decode(adminToken).role
    console.log(role, "admin role")
  }
  return (
    <>
      { adminToken && role === "ADMIN" ? 
        <>
          <div className="admin-sidenav">
            <Link to ="/admin/dashboard">Dashboard</Link>
            <Link to ="/admin/all-products">Products</Link>
            <Link to ="/admin/inventory">Inventory</Link>
            <Link to ="/admin/all-transactions">Transactions</Link>
            <Link to ="/admin" onClick = {() => logOut()}>Logout</Link>
          </div>
          <div className="admin-main">hello</div>
        </> 
      : <AccessDenied/> }
    </>
  );
};

export default Dashboard;