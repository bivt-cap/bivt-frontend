/**
 * Actions for handling Login and Session.
 *
 * @version 0.0.1
 * @author Yalcin Tatar (https://github.com/yalcinos)
 */
import {bivtURL} from '../../apis/bivtApi';
import {GoogleSignin, statusCodes} from '@react-native-community/google-signin';
import * as Keychain from 'react-native-keychain';

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
export const initialState = () => {
  return {
    type: 'RESET_ERROR_MSG',
  };
};
export const googleLoginSuccess = (googleLoginDetails) => {
  return {
    type: 'GOOGLE_LOGIN_SUCCESS',
    payload: googleLoginDetails,
  };
};
export const forgotPasswordFail = (error) => {
  return {
    type: 'FORGOT_PASSWORD_FAIL',
    payload: error,
  };
};
export const forgotPasswordSuccess = (forgotPasswordDetails) => {
  return {
    type: 'FORGOT_PASSWORD_SUCCESS',
    payload: forgotPasswordDetails,
  };
};
export const writeJTWtoKeyChain = async (token) => {
  try {
    const jwtToken = token;
    if (jwtToken !== '') {
      // Store the credentials
      await Keychain.setGenericPassword('token', jwtToken);
    } else {
      console.log('Token not found');
    }
  } catch (error) {
    console.log("Keychain couldn't be accessed!", error);
  }
};

export const readJWTFromKeyChain = async () => {
  try {
    // Retrieve the credentials
    const credentials = await Keychain.getGenericPassword();
    console.log('Credentials', credentials);
    if (credentials) {
      //Encrypt token and send to the asyncStorage because asyncStroage is not SECURE!
      console.log(
        'Credentials successfully loaded for user ' + credentials.username,
      );
      return credentials.password;
    } else {
      console.log('No credentials stored');
    }
  } catch (e) {
    console.log('Error', e);
  }
};
//Once user click logout button clear token from storage.
export const deleteJTWFromKeyChain = async () => {
  try {
    const resetPassword = await Keychain.resetGenericPassword();
    if (resetPassword) {
      console.log('Token successfully removed');
      return true;
    } else {
      return false;
    }
  } catch (e) {
    console.log(e);
  }
};

/**
 * Actions for handling Login and Session.
 */
export const loginUser = (loginDetails) => {
  const userInfo = {
    email: loginDetails.email,
    password: loginDetails.password,
  };

  return async (dispatch) => {
    //Dispatch: is going to take an action, copy of the object and pass to reducer.
    try {
      dispatch(loginReguest);
      const response = await bivtURL.post('/auth/local', userInfo);
      if (response.status === 200 && response.data.data.token !== '') {
        writeJTWtoKeyChain(response.data.data.token);
        //get user informations from DB
        dispatch(loginSuccess(response.data.data.user));
      }
    } catch (error) {
      const errorMsg = error.message;
      console.log(errorMsg);
      const errorMessgage = 'Please Enter right username/password.';
      dispatch(loginFail(errorMessgage));
    }
  };
};

// Google Auth Sign In Action
export const googleSignIn = async (dispatch) => {
  try {
    await GoogleSignin.hasPlayServices();
    const googleuserInfo = await GoogleSignin.signIn();
    const googleToken = {token: googleuserInfo.idToken};
    console.log('User informations: ', googleuserInfo);
    const response = await bivtURL.post('/auth/google', googleToken);
    // console.log(response.data.data.token);
    if (response.status === 200 && response.data.data.token !== '') {
      //Code: Here fetch google data from backend not from Google. Talk Eduardo with google auth endpoint
      const googleUserInfo = response.data.data.user;
      console.log(googleUserInfo);
      dispatch(googleLoginSuccess(googleUserInfo));
    }
  } catch (error) {
    if (error.code === statusCodes.SIGN_IN_CANCELLED) {
      // user cancelled the login flow
      console.log(error);
    } else if (error.code === statusCodes.IN_PROGRESS) {
      // operation (e.g. sign in) is in progress already
      console.log(error);
    } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
      // play services not available or outdated
      console.log(error);
    } else {
      const errorMessgage =
        'This email is already registered in the system. Please try to use application login.';
      dispatch(loginFail(errorMessgage));
    }
  }
};
export const forgotUserPassword = (userEmail) => {
  try {
    const emailDetail = {
      email: userEmail.email,
    };
    return async (dispatch) => {
      //Dispatch: is going to take an action, copy of the object and pass to reducer.
      try {
        dispatch(loginReguest);
        const response = await bivtURL.post(
          '/user/forgotPassword',
          emailDetail,
        );
        if (response.status === 200 && response.data.emailToken !== '') {
          //send email to the user
          dispatch(
            forgotPasswordSuccess(
              'Email succesfully sent! \nClick the link in the email to reset your password!',
            ),
          );
        }
      } catch (error) {
        const errorMsg = error.message;
        console.log(errorMsg);
        const errorMessgage =
          'User not found. Please enter valid Email Address';
        dispatch(forgotPasswordFail(errorMessgage));
      }
    };
  } catch (error) {}
};
export const checkGoogleSession = async (dispatch) => {
  try {
    const isSignedIn = await GoogleSignin.isSignedIn();
    if (isSignedIn) {
      const currentUser = await GoogleSignin.signInSilently();
      const googleToken = {token: currentUser.idToken};
      const response = await bivtURL.post('/auth/google', googleToken);
      if (response.status === 200 && response.data.data.token !== '') {
        const googleUserInfo = response.data.data.user;

        dispatch(googleLoginSuccess(googleUserInfo));
      }
    }
  } catch (error) {
    if (error.code === statusCodes.SIGN_IN_REQUIRED) {
      console.log(statusCodes.SIGN_IN_REQUIRED);
    } else {
      // some other error
    }
  }
};
export const checkLocalSession = async (dispatch) => {
  try {
    const token = await readJWTFromKeyChain();
    dispatch(loginReguest);
    if (token !== '') {
      const localToken = 'bearer ' + token;

      const headersInfo = {
        'content-type': 'application/json',
        authorization: localToken,
      };
      const config = {
        headers: headersInfo,
      };
      // console.log(config);
      const response = await bivtURL.get('/auth/check', config);
      console.log(response);
      console.log('Returned Status code', response.status);
      if (response.status === 200) {
        dispatch(loginSuccess(response.data.data));
      } else {
        dispatch(loginFail('Session is timeout'));
      }
    } else {
      dispatch(loginFail('Session is timeout'));
      console.log('Error while reading token');
    }
  } catch (error) {
    const errorMsg = error.message;
    // dispatch(loginFail('Session is timeout'));
    console.log("User has to login, couldn't find session: ", errorMsg);
  }
};
