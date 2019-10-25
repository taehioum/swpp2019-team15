import * as actionTypes from '../actions/actionTypes';

const initialState = {
  authenticated: false,
  userid: null,
  //selectedQuestion: null,
  //user_name: null,
  //targetLocation: null,
  //questions: []
}

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SIGN_UP: //nothing to do, really or show some success message?
      return {...state};
    case actionTypes.AUTHENTICATED:
      const userid = action.userid;
      console.log(userid);
      return { ...state, authenticated: true, userid:userid};
    case actionTypes.UNAUTHENTICATED:
      return {...state, authenticated: false, userid:null};
    default:
      break;
  }
  return state;
}

export default authReducer;