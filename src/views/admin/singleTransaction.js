import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { paymentIntentById } from "../../redux/actions/transactions";
import { logOut } from "../../redux/actions/auth";
import { Link, useParams } from "react-router-dom";
import "../../components/admin/singleTransaction.css";
import "../../components/admin/navSide.css";
import PaymentIcon from '@material-ui/icons/Payment';
import { Badge, Pill } from 'evergreen-ui'
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import {Button} from "reactstrap";

const SingleTransaction = () => {
  const user = useSelector(state => state.auth)
  const {paymentIntentId} = useParams()
  const transaction = useSelector(state => state.transaction.singleTransaction)
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(paymentIntentById(paymentIntentId))
  }, [dispatch])
  
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
          <p>City, State, ZIP code</p>
          <p>Origin</p>
          <p>Street check</p>
          <p>CVC check</p>
          <p>ZIP check</p>
        </div>
        <div className="payment_details">
          <p>{transaction && transaction.charges ? transaction.charges.data[0].billing_details.name : ""}</p>
          <p>{transaction && transaction.charges ? transaction.charges.data[0].billing_details.email : ""}</p>
          <p>{transaction && transaction.charges ? transaction.charges.data[0].billing_details.address.line1 : ""}</p>
          <p>{transaction && transaction.charges ? transaction.charges.data[0].billing_details.address.line2 : ""}</p>
          <p>
            {transaction && transaction.charges ? transaction.charges.data[0].billing_details.address.city : ""},  
            {transaction && transaction.charges ? transaction.charges.data[0].billing_details.address.state : ""}, 
            {transaction && transaction.charges ? transaction.charges.data[0].billing_details.address.postal_code : ""}
          </p>
          <p>{transaction && transaction.charges ? transaction.charges.data[0].billing_details.address.country : ""}abc</p>
          <p>{transaction && transaction.charges ? transaction.charges.data[0].payment_method_details.card.checks.address_line1_check : ""}</p>
          <p>{transaction && transaction.charges ? transaction.charges.data[0].payment_method_details.card.checks.cvc_check : ""}</p>
          <p>{transaction && transaction.charges ? transaction.charges.data[0].payment_method_details.card.checks.address_postal_code_check : ""}</p>
        </div>
      </div>
     {/*  <br/> */}
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
  );
};

export default SingleTransaction;