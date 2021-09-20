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
      return {_id: action.payload._id, role:action.payload.role, email:action.payload.email, isAuth:true}
    case 'SIGNUP_SUCCESS':
      return {role:action.payload.role, email:action.payload.email, isAuth:false}
    case 'LOGIN_FAILED':
      return {isAuth:false};
    default:
      return state;
  }
}
export default authReducer;