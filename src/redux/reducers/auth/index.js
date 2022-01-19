const initialState = {
  role:'',
  email:'',
  mobile: '',
  firstName:'',
  lastName: '',
  name: '',
  isAuth: false
}

const authReducer = (state = initialState, action) => {
  console.log(action, "action");
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      console.log(action.payload.email, "p email")
      return {email: action.payload.email, mobile: action.payload.mobile, isAuth:true}
    case 'SIGNUP_SUCCESS':
      return {...state, role:action.payload.role, email:action.payload.email, isAuth:false}
    case 'LOGIN_FAILED':
      return {...state, isAuth:false};
    default:
      return state;
  }
}
export default authReducer;