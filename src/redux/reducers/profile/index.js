const initialState = {
  updatedProfile: {},
  userProfileData: {}
};
 
const ProfileReducer = (state = initialState, action) => {
console.log(action, "action");
switch (action.type) {
  case "UPDATE_PROFILE":
    return { ...state, updatedProfile: action.payload.result };
  case "GET_PROFILE":
    return { ...state, userProfileData: action.payload.result };
  default:
    return state;
}
};
export default ProfileReducer;