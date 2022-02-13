import request from "../../../services/request";
import { history } from "../../../history";
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'; 
toast.configure() 

export const login = ({email, password}, event) => {
  return async (dispatch) => {
    const response = await request.post('/auth/login', {email, password, role:"CUSTOMER"});
    if (response.data.success === false) {
      event.preventDefault();
      toast.error(response.data.message, {autoClose:2000})
      dispatch({
        type:"LOGIN_FAILED",
        payload:response.data.result
      })
    } else {
      await dispatch({
        type: "LOGIN_SUCCESS",
        payload: response.data.result.userData
      })
      toast.success(response.data.message, {autoClose:2000})
      localStorage.setItem('token', response.data.result.token);
      localStorage.setItem('user', JSON.stringify(response.data.result));
      history.push('/')
      window.location.reload();
    } 
  }
}

export const signup = ({firstName, lastName, email, mobile, password}, event) => {
  return async (dispatch) => {
    const response = await request.post('/auth/signup', {firstName, lastName, email, mobile, name: firstName + ' ' + lastName, role:"CUSTOMER", password});
    console.log(response.data, "USERINFORMATION");
    if (response.data.success) {
      await dispatch({
        type: "SIGNUP_SUCCESS",
        payload: response.data.result
      })
      toast.success(response.data.message, {autoClose:2000})
      localStorage.setItem('token', response.data.result.token);
      localStorage.setItem('user', JSON.stringify(response.data.result));
    } else {
      event.preventDefault();
      toast.error(response.data.message, {autoClose:2000})
      dispatch({
        type:"LOGIN_FAILED",
        payload:response.data
      })
    }
    return response.data;
  }
}

export const verifyEmail = (userId, e) => {
  return async (dispatch) => {
    const response = await request.get(`/auth/verify-email/${userId}`);
    if (response.data.success === false) {
      e.preventDefault()
      toast.error(response.data.message, {autoClose:2000})
    } else {
      await dispatch({
        type: "VERIFY_EMAIL",
        payload: response.data
      })
      toast.success(response.data.message, {autoClose:2000})
    }
  }
}

export const adminLogin = ({email, password, role}) => {
  return async (dispatch) => {
    const response = await request.post('/auth/login', {email, password, role});
    console.log(response.data, "USERINFORMATION");
    if (response.data.success) {
    await dispatch({
      type: "LOGIN_SUCCESS",
      payload: response.data.result.userData
    })
    
    localStorage.setItem('token', response.data.result.token);
    localStorage.setItem('user', JSON.stringify(response.data.result));
    } else {
      dispatch({
        type:"LOGIN_FAILED",
        payload:response.data
      })
    }
    return response.data;
  }
}

export const otp = ({email}) => {
  return async () => {    
    const response = await request.patch(`/auth/forgot-password`, {email})
    if (response.data.success) {
      toast.success(response.data.message, {autoClose:2000})
    }
    return response.data;
  }
}

export const verifyOtp = ({email, otpValue}, e) => {
  const otp = otpValue
  return async () => {
    const response = await request.patch('/auth/verify-Otp', {email, otp})
    if (response.data.success === false) {
      e.preventDefault()
      toast.error(response.data.message, {autoClose:2000})
    } else {
      toast.success(response.data.message, {autoClose:2000})
      history.push('/reset-password')
      window.location.reload();
      return response.data;
    }
  }
}

export const resetPassword = ({email, password}, e) => {
  console.log(password, email)
  return async () => {
    const response = await request.patch('/auth/password', {email, password});
    if (response.data.success) {
      toast.success(response.data.message, {autoClose:2000})
      history.push('/login')
      window.location.reload();
    } else {
      e.preventDefault()
      toast.error(response.data.message, {autoClose:2000})
    }
    return response.data;
  }
}

export const logOut = () => {
  localStorage.clear();
  console.log("Logging out")
  toast.success("Logged Out Successfully", {autoClose:2000})
  if (localStorage.length === 0) return true;
  return false;
}