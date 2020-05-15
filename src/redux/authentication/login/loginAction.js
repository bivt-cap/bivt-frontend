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
export const encryptJWTToken = async (token) => {
  const jwtToken = token;
  // Store the credentials
  await Keychain.setGenericPassword('token', jwtToken);
  try {
    // Retrieve the credentials
    const credentials = await Keychain.getGenericPassword();
    console.log('Credentials', credentials);
    if (credentials) {
      //Encrypt token and send to the asyncStorage because asyncStroage is not SECURE!
      storeJWTtoAsyncStorage(credentials.password);
      // console.log('sdf', credentials.password);
      console.log(
        'Credentials successfully loaded for user ' + credentials.username,
      );
    } else {
      console.log('No credentials stored');
    }
  } catch (error) {
    console.log("Keychain couldn't be accessed!", error);
  }
  await Keychain.resetGenericPassword();
};
export const storeJWTtoAsyncStorage = async (token) => {
  try {
    // encryptJWTToken(token);
    console.log('Stored Token', token);
    await AsyncStorage.setItem('@JWT_Key', token);
  } catch (e) {
    console.log(e);
  }
};
export const ReadJWTtoAsyncFromStorage = async () => {
  try {
    const value = await AsyncStorage.getItem('@JWT_Key');
    if (value !== null) {
      console.log('TOKEEN!!', value);
      // value previously stored
      return true;
    }
  } catch (e) {
    console.log('Error', e);
  }
};
//Once user click logout button clear token from storage.
export const deleteJWTfromAsyncStorage = async () => {
  try {
    await AsyncStorage.removeItem('@JWT_Key');
    const value = await AsyncStorage.getItem('@JWT_Key');
    console.log(value);
    return true;
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
    dispatch(loginReguest);
    try {
      const response = await bivtURL.post('/auth/local', userInfo);
      if (response.status === 200 && response.data.data.token !== '') {
        encryptJWTToken(response.data.data.token);
        // storeJWTtoAsyncStorage(response.data.data.token);
        //get user informations from DB
        dispatch(loginSuccess(response.data.data.user));
        // ReadJWTtoAsyncFromStorage();
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
    const getToken = await GoogleSignin.getTokens();
    console.log(getToken);
    console.log('User informations: ', gooleuserInfo);
    //Code: Here fetch google data from backend not from Google. Talk Eduardo with google auth endpoint
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
