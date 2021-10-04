import request from "../../../services/request";
export const login = ({email, password}) => {
  return async (dispatch) => {
    const response = await request.post('/auth/login', {email, password, role:"CUSTOMER"});
    console.log(response.data, "USERINFORMATION");
    if (response.data.success) {
    await dispatch({
      type: "LOGIN_SUCCESS",
      payload: response.data.result.userData[0]
    })
    
    localStorage.setItem('token', response.data.result.token);
    localStorage.setItem('user', JSON.stringify(response.data.result));
    } else {
      dispatch({
        type:"LOGIN_FAILED",
        payload:response.data
      })
    }
    /* if (response.data.success) {
    window.location.reload();
    } */
    return response.data;
  }
}

export const signup = ({firstName, lastName, email, mobile, password}) => {
  return async (dispatch) => {
    const response = await request.post('/auth/signup', {firstName, lastName, email, mobile, name: firstName + ' ' + lastName, role:"CUSTOMER", password});
    console.log(response.data, "USERINFORMATION");
    if (response.data.success) {
    await dispatch({
      type: "SIGNUP_SUCCESS",
      payload: response.data
    })
    
    localStorage.setItem('token', response.data.result.token);
    localStorage.setItem('user', JSON.stringify(response.data.result));
    } else {
      dispatch({
        type:"LOGIN_FAILED",
        payload:response.data
      })
    }
    /* if (response.data.success) {
    window.location.reload();
    } */
    return response.data;
  }
}

export const verifyEmail = (userId) => {
  return async (dispatch) => {
    const response = await request.get(`/auth/verify-email/${userId}`);
    await dispatch({
      type: "VERIFY_EMAIL",
      payload: response.data
    })
  }
}

export const adminLogin = ({email, password, role}) => {
  return async (dispatch) => {
    const response = await request.post('/auth/login', {email, password, role});
    console.log(response.data, "USERINFORMATION");
    if (response.data.success) {
    await dispatch({
      type: "LOGIN_SUCCESS",
      payload: response.data.result.userData[0]
    })
    
    localStorage.setItem('token', response.data.result.token);
    localStorage.setItem('user', JSON.stringify(response.data.result));
    } else {
      dispatch({
        type:"LOGIN_FAILED",
        payload:response.data
      })
    }
    /* if (response.data.success) {
    window.location.reload();
    } */
    return response.data;
  }
}

export const otp = ({email}) => {
  return async (dispatch) => {    
    console.log("forgot pass");
    const response = await request.patch(`/auth/forgot-password`, {email})
    return response.data;
  }
}

export const verifyOtp = ({email, otpVal}) => {
  return async (dispatch) => {
    const response = await request.patch('/v1/auth/verify-Otp', {email, otp:otpVal})
    return response.data;
  }
}

export const resetPassword = ({password, locationId, userId}) => {
  console.log(password, locationId, userId)
  return async (dispatch) => {
    const response = await request.put('/v1/auth/register', {password, locationId, userId});
    console.log(response.status, "response")
    return response.data;
  }
}

export const logOut = () => {
  localStorage.clear();
  console.log("Logging out")
  if (localStorage.length === 0) return true;
  return false;
}