import axios from 'axios';
import {signUpUrl} from '../../apis/apis';
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

export const signupUser = (userSignupDetails) => {
  const userInfo = {
    firstName: userSignupDetails.firstName,
    lastName: userSignupDetails.lastName,
    email: userSignupDetails.eMail,
    password: userSignupDetails.password,
  };
  const config = {
    headers: userInfo,
  };
  return (dispatch) => {
    dispatch(signupUserRequest);
    axios.post(signUpUrl, userInfo, config).then(
      (response) => {
        const registrationDetails = response.data; //email token
        dispatch(signupUserSuccess('account successfully created'));
      },
      (error) => {
        console.log(error.response.data);
        const errorMsg = error.response.data.status.errors;
        dispatch(signupUserFailure(errorMsg));
      },
    );
  };
};
