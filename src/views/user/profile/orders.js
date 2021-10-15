import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { Link, Redirect } from "react-router-dom";
import HideTop from "../../../components/Navigation/hideTop.js";
import Footer from "../../../components/footer.js";
import { getMyAddress, removeAddress, selectAddress } from "../../../redux/actions/address/index.js";
import { getMyOrder } from "../../../redux/actions/order/index.js";
import "../../../components/savedAddresses.css"
import { Button } from "@material-ui/core";

const Orders = () => {
  const dispatch = useDispatch();
  const user = localStorage.getItem("token")
  const orderData = useSelector(state => state.order.getMyOrder)
  useEffect(()=> {
    dispatch(getMyAddress())
    dispatch(getMyOrder())
  }, [dispatch])

  const handleEdit = (data) => {
    console.log(data, data._id, "data")
    localStorage.setItem("address", JSON.stringify(data));
    dispatch(selectAddress(data))
  }

  return(
    <>
      { user ? 
        <>
          <HideTop/>
          <div style={{marginTop: "10%"}}>
            <div className="column1" style={{backgroundColor: "#aaa"}}>
              <ul className="unordered">
                <Link to = "/profile"><li className="list"><Button>Account</Button></li></Link>
                <Link to = "/saved-addresses"><li className="list"><Button>Saved Addresses</Button></li></Link>
                <Link to = "/orders"><li className="list"><Button>Orders</Button></li></Link>
              </ul>
            </div>
            <div className="column2" >
              {orderData && orderData.orderHistory? (
                orderData.orderHistory.map(history => (
                  history.order.map(orderInfo => {
                    return(
                      <>
                        <div style={{height: "190px"}}>
                          <img src={`http://localhost:5000/${orderInfo.product.image}`} style={{width: "170px", height: "170px", marginRight: "15px", float: "left"}}/>
                          <div>{orderInfo.product.title}</div> 
                          <div>{orderInfo.product.description}</div>
                          <div>{orderInfo.size}</div>
                          <div>{orderInfo.quantity}</div>
                          <div>{orderInfo.price}</div>
                        </div>
                      </>
                    )
                  })
                  /* (<>line brek</>) */
                )
              )
              ): (
                <h1>No Orders Placed</h1>
              )}
            </div>
          </div>  
          <Button>Logout</Button>
        </> 
      : <Link to="/login"></Link> } 
      <Footer/>
    </>
  );
}

export default Orders