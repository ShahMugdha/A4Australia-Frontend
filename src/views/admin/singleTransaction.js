import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { paymentIntentById } from "../../redux/actions/transactions";
import {getCustomerOrder} from "../../redux/actions/order";
import { logOut } from "../../redux/actions/auth";
import { Link, useParams } from "react-router-dom";
import "../../components/admin/singleTransaction.css";
import "../../components/admin/navSide.css";
import AccessDenied from "../../components/error-pages/accessDenied.js"
import PaymentIcon from '@material-ui/icons/Payment';
import { Badge, Pill } from 'evergreen-ui'
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import jwt_decode from "jwt-decode";
import {Button} from "reactstrap";

const SingleTransaction = () => {
  const adminToken = localStorage.getItem("token")
  var role
  if(adminToken) {
    role = jwt_decode(adminToken).role
  }
  const {paymentIntentId} = useParams()
  const transaction = useSelector(state => state.transaction.singleTransaction)
  const order = useSelector(state => state.order.getCustomerOrder)
  const count = order && order.orderHistory ? order.orderHistory.length : 0
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(paymentIntentById(paymentIntentId))
    dispatch(getCustomerOrder(paymentIntentId))
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
          <PaymentIcon style={{float: "left", color: "GrayText"}}/>
          <span style={{float: "left", color: "GrayText"}}>Payment</span>
          <br/>
          <h2 style={{float: "left"}}>Rs. {(transaction.amount_received/100).toFixed(2)}</h2>
          <Badge color="green" style={{float: "left", marginTop: "10px", marginLeft: "5px"}}>Succeeded</Badge> 
          <br/>
          <table style={{width: "40%", marginLeft: "0px"}}>
            <tr style={{color: "gray", fontSize: "5px"}}>
              <td style={{padding: "1px"}}>Date</td>
              {/* <td style={{padding: "1px"}}>Customer</td> */}
              <td style={{padding: "1px"}}>Payment method</td>
              <td style={{padding: "1px"}}>Risk evaluation</td>
            </tr>
            <tr style={{color: "#404040", fontSize: "5px"}}>
              <td style={{padding: "1px"}}>{transaction.created}</td>
              {/* <td style={{padding: "1px"}}>Tobias</td> */}
              <td style={{padding: "1px"}}>....{transaction&&transaction.charges? transaction.charges.data[0].payment_method_details.card.last4: ""}</td>
              <td style={{padding: "1px"}}><Pill color="green" style={{marginRight: "5px"}}>{transaction&&transaction.charges ? transaction.charges.data[0].outcome.risk_score : ""}</Pill>{transaction&&transaction.charges ? transaction.charges.data[0].outcome.risk_level : ""}</td>
            </tr>
          </table>
          <br/>
          <h2 style={{float: "left"}}>Order Details</h2>
          <br/>
          {order && order.orderHistory ? (
            order.orderHistory[count-1].order.map(orderData => {
              return(
                <>
                  <table style={{width: "40%", marginLeft: "0px"}}>
                    <tr style={{fontSize: "5px"}}>
                      <td style={{padding: "1px"}}>Product</td>
                      <td style={{padding: "1px"}}>{orderData.product.title}</td>
                    </tr>
                    <tr style={{fontSize: "5px"}}>
                      <td style={{padding: "1px"}}>Size</td>
                      <td style={{padding: "1px"}}>{orderData.size}</td>
                    </tr>
                    <tr style={{fontSize: "5px"}}>
                      <td style={{padding: "1px"}}>Qty</td>
                      <td style={{padding: "1px"}}>{orderData.quantity}</td>
                    </tr>
                    <tr style={{fontSize: "5px"}}>
                      <td style={{padding: "1px"}}>Price</td>
                      <td style={{padding: "1px"}}>{orderData.price}</td>
                    </tr>
                  </table>
                </>
              )
            })
          ) : (
            <h1> Order not available</h1>
          )}
          <br/>
          <h2 style={{float: "left"}}>Payment Details</h2>
          <br/>
          <div className="fields">
            <div className="payment_details">
              <p>Amount</p>
              <p>Fee</p>
              <p>Net</p>
              <p>Status</p>
            </div>
            <div className="payment_details">
              <p>Rs. {transaction ? (transaction.amount/100).toFixed(2) : 0}</p>
              <p>Rs. 54.94</p>
              <p>Rs. {transaction ? (transaction.amount/100).toFixed(2) - 54.94 : 0}</p>
              <p>{transaction ? transaction.status : ""}</p>
            </div>
          </div>
          <br/>
          <h2 style={{float: "left"}}>Payer Details</h2>
          <br/>
          <div className="fields">
            <div className="payment_details">
              <p>Owner</p>
              <p>Owner Email</p>
              <p>Address line 1</p>
              <p>Address line 2</p>
              <p>City, State, ZIP</p>
              <p>Origin</p>
              <p>Street check</p>
              <p>CVC check</p>
              <p>ZIP check</p>
            </div>
            <div className="payment_details">
              <p>{transaction && transaction.shipping ? transaction.shipping.name : ""}</p>
              <p>{transaction && transaction.shipping ? transaction.receipt_email : ""}</p>
              <p>{transaction && transaction.shipping ? transaction.shipping.address.line1 : ""}</p>
              <p>{transaction && transaction.shipping ? transaction.shipping.address.line2 : ""}</p>
              <p>
                {transaction && transaction.shipping ? transaction.shipping.address.city : ""},  
                {transaction && transaction.shipping ? transaction.shipping.address.state : ""}, 
                {transaction && transaction.shipping ? transaction.shipping.address.postal_code : ""}
              </p>
              <p>{transaction && transaction.shipping ? transaction.shipping.address.country : ""}abc</p>
              <p>{transaction && transaction.shipping ? transaction.charges.data[0].payment_method_details.card.checks.address_line1_check : ""}</p>
              <p>{transaction && transaction.shipping ? transaction.charges.data[0].payment_method_details.card.checks.cvc_check : ""}</p>
              <p>{transaction && transaction.shipping ? transaction.charges.data[0].payment_method_details.card.checks.address_postal_code_check : ""}</p>
            </div>
          </div>
          <br/> 
          <h2 style={{float: "left"}}>Receipt History</h2>
          <Button style={{float: "right", margin: "5px 5px"}}>Send Receipt</Button>
          <Button style={{float: "right", margin: "5px 5px"}}>View Receipt</Button>
          {/* <br/> */}
          <div style={{float: "left"}}>
            {transaction && transaction.charges && transaction.charges.data[0].receipt_number? 
              <div style={{margin: "5px"}}>
                <Badge color="blue" style={{margin: "5px"}}>Payment</Badge>sent to {transaction.receipt_email}
              </div> : "No receipt sent"
            }
          </div>
          </div>
        </> 
      : <AccessDenied/> }
    </>
  );
};

export default SingleTransaction;