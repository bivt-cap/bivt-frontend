/**
 * Signup actions
 *
 * @version 0.0.1
 * @author Arshdeep Singh (https://github.com/Singh-Arshdeep)
 */

import {bivtURL} from '../../apis/bivtApi';
import {
  SIGNUP_USER_FAILURE,
  SIGNUP_USER_SUCCESS,
  SIGNUP_USER_REQUEST,
} from './signupTypes';

export const signupUserRequest = () => {
  return {
    type: SIGNUP_USER_REQUEST,
  };
};

export const signupUserSuccess = (registrationDetails) => {
  return {
    type: SIGNUP_USER_SUCCESS,
    payload: registrationDetails,
  };
};

export const signupUserFailure = (error) => {
  return {
    type: SIGNUP_USER_FAILURE,
    payload: error,
  };
};

/**
 * This function calls the REST api to register users
 */
export const signupUser = (userSignupDetails) => {
  const userInfo = {
    firstName: userSignupDetails.firstName,
    lastName: userSignupDetails.lastName,
    email: userSignupDetails.eMail,
    password: userSignupDetails.password,
  };

  return async (dispatch) => {
    dispatch(signupUserRequest);
    try {
      const response = await bivtURL.post('/user/create', userInfo);
      const registrationDetails = response.data; //email token
      dispatch(signupUserSuccess('account successfully created'));
    } catch (error) {
      const errorMsg = error.response.data.status.errors;
      dispatch(signupUserFailure(errorMsg));
    }
  };
};
