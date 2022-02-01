import {React, useState} from 'react';
import OtpInput from 'react-otp-input';
import { useDispatch } from 'react-redux';
import '../../components/verifyOtp.css';
import { otp, verifyOtp } from "../../redux/actions/auth";
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'; 
toast.configure() 

const VerifyOtp = () => {
  const [otpValue, setOtpValue] = useState(0)
  const email = JSON.parse(localStorage.getItem("email"))
  const dispatch= useDispatch()

  const handleSubmit = async () => {
    dispatch(otp({email}))
  }

  const handleChange = (e) => {
    if(!otpValue) {
      e.preventDefault()
      toast.error("Please enter the OTP", {autoClose:2000})
    }
    dispatch(verifyOtp({email, otpValue}, e));
  }

  return (
    <>
      <div style={{marginTop: "4.5em", fontSize: "40px"}}>Enter OTP</div>
      <OtpInput
        value={otpValue}
        isInputNum={true}
        shouldAutoFocus={true}
        isInputSecure={true}
        onChange={(otpValue) => setOtpValue(otpValue)}
        numInputs={6}
        containerStyle={{justifyContent: "space-around", marginTop: "5rem", marginLeft: "1%"}}
        inputStyle={{width: "3rem", borderColor: "black", fontSize: "30px", textAlign: "center"}}
      />
      <button className='reset' onClick={(e) => handleChange(e)}>Reset Password</button>
      <div style={{marginTop: "1%"}}>
        Didn't receive the OTP?
        <span onClick={(e) => handleSubmit(e)} style={{marginLeft: "0.5rem", cursor: "pointer"}}>Send Again</span>
      </div>
    </>
  );
};

export default VerifyOtp;