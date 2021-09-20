import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { paymentIntentsList } from "../../redux/actions/transactions";
import { logOut } from "../../redux/actions/auth";
import { Link } from "react-router-dom";
import "../../components/admin/inventory/inventory.css";
import "../../components/admin/navSide.css";
import AccessDenied from "../../components/error-pages/accessDenied.js"
import SendIcon from '@material-ui/icons/Send';
import DetailsIcon from '@material-ui/icons/Details';
import jwt_decode from 'jwt-decode';
import {Button} from "reactstrap";

const AllTransactions = () => {
  const adminToken = localStorage.getItem("token")
  var role
  if(adminToken) {
    role = jwt_decode(adminToken).role
  }
  const transactionList = useSelector(state => state.transaction.allTransactions)
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(paymentIntentsList())
  }, [dispatch])
  
  return (
    <>
      { adminToken && role === 'ADMIN' ?
        <>
          <div className="admin-sidenav">
            <Link to ="/admin/dashboard">Dashboard</Link>
            <Link to ="/admin/all-products">Products</Link>
            <Link to ="/admin/inventory">Inventory</Link>
            <Link to ="/admin/all-transactions">Transactions</Link>
            <Link to ="/admin" onClick = {() => logOut()}>Logout</Link>
          </div>
          <div className="admin-main">
          <div>Payments</div>
          <div style={{marginLeft: "4rem"}}>
            <table>
              <thead>
                <tr>
                  <th>Amount</th>
                  <th>Status</th>
                  <th>Description</th>
                  <th>Customer</th>
                  <th>Date</th>
                </tr>
              </thead>
              {transactionList.data ? (  
                transactionList.data.map((transaction) => {
                  return (
                    <>            
                      <tbody>    
                        <tr>    
                          <td>{(transaction.amount_received / 100).toFixed(2)}</td> 
                          <td>{transaction.status}</td>
                          <td>{transaction.id}</td>
                          <td>{transaction.receipt_email}</td>
                          <td>{transaction.created}</td>
                          <td><SendIcon style = {{fontSize: "14px", cursor: "pointer"}} /></td>
                          <td><Link to = {`/admin/transaction/${transaction.id}`}><DetailsIcon style = {{fontSize: "14px", cursor: "pointer", color: "black"}} /></Link></td>
                        </tr>
                      </tbody>
                    </>
                  )
                })
              ) : (
                <h3>No Payments Received</h3>
              )} 
            </table>
          </div>
          </div>
        </> 
      : <AccessDenied/> }
    </>
  );
};

export default AllTransactions;