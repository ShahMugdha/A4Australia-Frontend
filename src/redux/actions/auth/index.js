import request from "../../../services/request";
export const login = ({email, password}) => {
  return async (dispatch) => {
    const response = await request.post('/auth/login', {email, password, role:"CUSTOMER"});
    console.log(response.data, "USERINFORMATION");
    if (response.data.success) {
    await dispatch({
      type: "LOGIN_SUCCESS",
      payload: response.data.result
    })
    
    localStorage.setItem('token', response.data.result.token);
    localStorage.setItem('user', JSON.stringify(response.data.result));
    } else {
      dispatch({
        type:"LOGIN_FAILED",
        payload:response.data
      })
    }
    if (response.data.success) {
    window.location.reload();
    }
    return response.data;
  }
}

export const otp = ({email}) => {
  return async (dispatch) => {    
    console.log("forgot pass");
    const response = await request.patch('/v1/auth/forgot-password', {email})
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