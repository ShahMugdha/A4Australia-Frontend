import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { Link } from "react-router-dom";
import HideTop from "../../../components/Navigation/hideTop.js";
import Footer from "../../../components/footer.js";
import { logOut } from "../../../redux/actions/auth/index.js";
import { getMyAddress } from "../../../redux/actions/address/index.js";
import { getMyOrder } from "../../../redux/actions/order/index.js";
import "../../../components/savedAddresses.css"
import { Button } from "@material-ui/core";

const Orders = () => {
  const dispatch = useDispatch();
  const user = localStorage.getItem("token")
  const orderData = useSelector(state => state.order.getMyOrder)

  const handleLogOut = () => {
    logOut()
  }

  useEffect(()=> {
    dispatch(getMyAddress())
    dispatch(getMyOrder())
  }, [dispatch])

  return(
    <>
      { user ? 
        <>
          <HideTop/>
          <div style={{marginTop: "10%"}}>
            <div className="column1" style={{backgroundColor: "#f1f1f1"}}>
              <ul className="unordered">
                <Link to = "/profile"><li className="list"><Button>Account</Button></li></Link>
                <Link to = "/saved-addresses"><li className="list"><Button>Saved Addresses</Button></li></Link>
                <Link to = "/orders/my-orders"><li className="list"><Button>Orders</Button></li></Link>
              </ul>
            </div>
            <div className="column2" style={{backgroundColor: "#ddd", overflowY: "auto"}} >
              {orderData && orderData.orderHistory? (
                orderData.orderHistory.map(history => (
                  history.order ? (history.order.map(orderInfo => {
                    return(
                      <>
                        
                          <li className="data" style={{height: "150px"}}>
                            <div>
                              <img src={`http://localhost:5000/${orderInfo && orderInfo.product ? orderInfo.product.image: null}`} 
                                style={{width: "140px", height: "140px", marginRight: "20px", float: "left"}}
                              />
                            </div> 
                            <div>
                              <div>{orderInfo && orderInfo.product ? orderInfo.product.title : ''}</div> 
                              <div>{orderInfo && orderInfo.product ? orderInfo.product.description : ''}</div>
                              <div>{orderInfo && orderInfo.product ? orderInfo.size : ''}</div>
                              <div>{orderInfo && orderInfo.product ? orderInfo.quantity : ''}</div>
                              <div>{orderInfo && orderInfo.product ? orderInfo.price : ''}</div>
                            </div>
                          </li>
                        
                        
                      </>
                    )
                  })):(<></>)
                )
              )
              ): (
                <h1>No Orders Placed</h1>
              )}
            </div>
          </div>  
          <div className="Logout-button" onClick={() => handleLogOut()}><Link to = "/"><Button style={{backgroundColor: "lavender", marginTop: "5%"}}>Logout</Button></Link></div>
        </> 
      : <Link to="/login"></Link> } 
      <Footer/>
    </>
  );
}

export default Orders