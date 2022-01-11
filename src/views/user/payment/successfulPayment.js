import {React, useState} from 'react';
import "../../../components/successfulPayment.css"
import { Link} from "react-router-dom";

const SuccessfulPayment = () => {
  return (
    <>
      <div>
        <div className="container">
          <div className="printer-top"></div>   
          <div className="paper-container">
            <div className="printer-bottom"></div>
            <div className="paper">
              <div className="main-contents">
                <div className="success-icon">&#10004;</div>
                <div className="success-title">
                  Payment Complete
                </div>
                <div className="success-description">
                  Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text.
                </div>
                <div className="order-details">
                  <div className="order-number-label">Order Number</div>
                  <div className="order-number">123456789</div>
                </div>
                <div className="order-footer">Thank you!</div>
              </div>
              <div className="jagged-edge"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SuccessfulPayment;