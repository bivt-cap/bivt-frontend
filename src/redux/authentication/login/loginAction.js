import {bivtURL} from '../../apis/bivtApi';
import {GoogleSignin, statusCodes} from '@react-native-community/google-signin';
import AsyncStorage from '@react-native-community/async-storage';
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
export const googleLoginSuccess = (googleLoginDetails) => {
  return {
    type: 'GOOGLE_LOGIN_SUCCESS',
    payload: googleLoginDetails,
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

//Check sign-in
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
      // dispatch(loginFail(errorMsg));
    }
  };
};

// Google Auth Sign In Action
export const googleSignIn = async (dispatch) => {
  try {
    await GoogleSignin.hasPlayServices();
    const googleuserInfo = await GoogleSignin.signIn();
    console.log('User informations: ', googleuserInfo);

    //Code: Here fetch google data from backend not from Google. Talk Eduardo with google auth endpoint
    dispatch(googleLoginSuccess(googleuserInfo));
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

export const checkGoogleSession = async (dispatch) => {
  try {
    const isSignedIn = await GoogleSignin.isSignedIn();
    if (isSignedIn) {
      const currentUser = await GoogleSignin.signInSilently();
      dispatch(googleLoginSuccess(currentUser));
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
      // console.log(localToken);
      const headersInfo = {
        'content-type': 'application/json',
        authorization: localToken,
      };
      const config = {
        headers: headersInfo,
      };
      // NEED: I need a post endpoint that accepts token that sored in storage and it will retrive success and user informations .
      const response = await bivtURL.get('/circle/byUser', config);
      console.log('Returned Status code', response.status);
      if (response.status === 200) {
        //I need to pass those user details that came from the endpoint.
        dispatch(loginSuccess('Yalcin'));
      }
    } else {
      console.log('Eror while reading token');
    }
  } catch (error) {
    const errorMsg = error.message;
    // dispatch(loginFail(errorMsg));
    console.log("User has to login, couldn't find session: ", errorMsg);
  }
};
