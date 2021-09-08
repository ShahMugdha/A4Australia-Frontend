import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { paymentIntentsList } from "../../redux/actions/transactions";
import { Link } from "react-router-dom";
import "../../components/admin/inventory/inventory.css"
import SendIcon from '@material-ui/icons/Send';
import {Button} from "reactstrap";

const AllTransactions = () => {
  const user = useSelector(state => state.auth)
  const transactionList = useSelector(state => state.transaction.allTransactions)
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(paymentIntentsList())
  }, [dispatch])
  
  return (
    <>
      { user.isAuth ? null : <Link to="/login"></Link> }
      <div>Payments</div>
      {transactionList.data ? (  
          transactionList.data.map((transaction) => {
            return (
              <>
                <div style={{padding: "0.02px"}}>
                <table>
                  <thead>
                    <tr>
                      <th>Amount</th>
                      <th>Status</th>
                      <th>Description</th>
                      <th>Customer</th>
                      <th colSpan = "2">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{transaction.amount_received}</td>
                      <td>{transaction.status}</td>
                      <td>{transaction.id}</td>
                      <td>{transaction.receipt_email}</td>
                      <td>{transaction.created.toString()}</td>
                    </tr>
                  </tbody>
                </table>
                </div>
              </>
            )
          })
      ) : (
        <h3>No Payments Received</h3>
      )} 
    </>
  );
};

export default AllTransactions;