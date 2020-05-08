import axios from 'axios';
import {loginBaseURL} from '../../apis/apis';

export const loginReguest = () => {
  return {
    type: 'LOGIN_REQUEST',
  };
};

export const loginSuccess = (loginDetails) => {
  return {
    type: 'LOGIN_SUCCESS',
    payload: loginDetails,
  };
};

export const loginFail = (error) => {
  return {
    type: 'LOGIN_FAIL',
    payload: error,
  };
};

//Check sign-in
export const loginUser = (loginDetails) => {
  const userInfo = {
    email: loginDetails.email,
    password: loginDetails.password,
  };
  const config = {
    headers: userInfo,
  };
  console.log(loginDetails);
  return async (dispatch) => {
    dispatch(loginReguest);
    try {
      const response = await loginBaseURL.post('/user/auth', userInfo, config);
      console.log(response);
      if (response.status === 200) {
        dispatch(loginSuccess('Login Sucess'));
      }
    } catch (error) {
      const errorMsg = error.message;
      dispatch(loginFail(errorMsg));
    }
  };
};
