/**
 * Signup reducer
 *
 * @version 0.0.1
 * @author Arshdeep Singh (https://github.com/Singh-Arshdeep)
 */

import {
  SIGNUP_USER_FAILURE,
  SIGNUP_USER_SUCCESS,
  SIGNUP_USER_REQUEST,
} from './signupTypes';

const signupInitialState = {
  loading: false,
  registrationDetails: '',
  error: '',
};

let signupReducer = (state = signupInitialState, action) => {
  switch (action.type) {
    case SIGNUP_USER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case SIGNUP_USER_SUCCESS:
      return {
        loading: false,
        registrationDetails: action.payload,
        error: '',
      };
    case SIGNUP_USER_FAILURE:
      return {
        loading: false,
        registrationDetails: '',
        error: action.payload,
      };
    default:
      return state;
  }
};

export default signupReducer;
