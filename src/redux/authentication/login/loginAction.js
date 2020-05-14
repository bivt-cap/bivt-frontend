import axios from 'axios';
import {loginBaseURL} from '../../apis/apis';
import {GoogleSignin, statusCodes} from '@react-native-community/google-signin';

//Purpose of Action: Describe some changes that we want to make to the data inside of our application.
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
export const googleLoginSuccess = (googleLoginDetails) => {
  return {
    type: 'GOOGLE_LOGIN_SUCCESS',
    payload: googleLoginDetails,
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
  return async (dispatch) => {
    //Dispatch: is going to take an action, copy of the object and pass to reducer.
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

// Google Auth Sign In Action
export const googleSignIn = async (dispatch) => {
  try {
    await GoogleSignin.hasPlayServices();
    const gooleuserInfo = await GoogleSignin.signIn();
    console.log('User informations: ', gooleuserInfo);
    //Code: Here post google token to endpoint
    dispatch(googleLoginSuccess(gooleuserInfo));
  } catch (error) {
    if (error.code === statusCodes.SIGN_IN_CANCELLED) {
      // user cancelled the login flow
    } else if (error.code === statusCodes.IN_PROGRESS) {
      // operation (e.g. sign in) is in progress already
    } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
      // play services not available or outdated
    } else {
      // some other error happened
    }
  }
};
