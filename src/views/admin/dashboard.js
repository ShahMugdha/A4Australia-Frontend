import { React } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../../redux/actions/auth";
import "../../components/admin/navSide.css";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const user = useSelector(state => state.auth)
  const dispatch = useDispatch();
  return (
    <>
      { user.isAuth ? null : <Link to="/login"></Link> }
      <div className="admin-sidenav">
        <Link to ="/admin/dashboard">Dashboard</Link>
        <Link to ="/admin/all-products">Products</Link>
        <Link to ="/admin/inventory">Inventory</Link>
        <Link to ="/admin/all-transactions">Transactions</Link>
        <Link to ="/admin" onClick = {() => logOut()}>Logout</Link>
      </div>
      <div className="admin-main">hello</div>
    </>
  );
};

export default Dashboard;