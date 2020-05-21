/**
 * The component for Login and
 *
 * @version 0.0.1
 * @author Yalcin Tatar (https://github.com/yalcinos)
 */

import React, {useEffect, useState} from 'react';
import {StyleSheet, ActivityIndicator, Alert} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {
  loginUser,
  googleSignIn,
  checkGoogleSession,
  checkLocalSession,
  initialState,
} from '../../../redux';
import {GOOGLE_IOS_CLIENT_ID, GOOGLE_WEB_CLIENT_ID} from 'react-native-dotenv';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-community/google-signin';
import styles from './loginStyles';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {
  Container,
  Content,
  Button,
  Item,
  Label,
  Input,
  H1,
  Form,
  Text,
  Toast,
} from 'native-base';
import {loginFormValidation} from './loginFormValidation';

const Login = ({navigation}) => {
  const userData = useSelector((state) => state.login);
  console.log('loginpage', userData);
  const dispatch = useDispatch();

  // ******************************************************//
  // ************ BEGININ OF STATES DECLARATIONS *********//
  // ***************************************************//
  const [loginData, setloginData] = useState({
    email: '',
    password: '',
  });

  const [loginError, setloginError] = useState({
    email: {
      error: false,
    },
    password: {
      error: false,
    },
    firstRender: true,
  });
  // ******************************************************//
  // ************ END OF STATES DECLERATIONS *********//
  // ***************************************************//

  //When there is no error at validation , run dispatch function and login
  // firstRender prob helps to stop sending fetch request when the app first render.
  useEffect(() => {
    GoogleSignin.configure({
      iosClientId: GOOGLE_IOS_CLIENT_ID,
      webClientId: GOOGLE_WEB_CLIENT_ID,
    });
    dispatch(checkGoogleSession);
    dispatch(checkLocalSession);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (
      !loginError.email.error &&
      !loginError.password.error &&
      !loginError.firstRender
    ) {
      dispatch(loginUser(loginData));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loginError]);

  // **********************************************************//
  // ************ BEGININ OF FUNCTIONS DECLARATIONS ***********//
  // **********************************************************//

  // normal login and google login check seperately and pass different params to the dash.
  // Navigate to Dasboard Feature.
  const checkisLoggedIn = () => {
    // console.log(userData.googleLoginDetails);
    if (userData.isLoggedin === 'True') {
      navigation.navigate('DashBoard', {loginInfo: userData.loginDetails});
    } else if (userData.googleisLoggedin === 'True') {
      navigation.navigate('DashBoard', {
        loginInfo: userData.googleLoginDetails,
      });
    } else {
      console.log('NOT LOGIN');
    }
  };

  // ************************************************//
  // ************ BEGININ OF EVENT HANDLERS *********//
  // ************************************************//
  const handleLoginInputChanges = (key, value) => {
    setloginData((prevState) => {
      return {
        ...prevState,
        [key]: value,
      };
    });
  };
  const handleLoginButtonClick = () => {
    setloginError(loginFormValidation(loginData));
  };
  const handleGoogleButtonClick = () => {
    dispatch(googleSignIn);
    console.log(userData);
  };
  const showAlertErrorMessage = (errorMsg) => {
    return Alert.alert(
      'Error',
      errorMsg,
      [
        {
          text: 'OK',
          onPress: () => {
            userData.errorStatus = 'False';
            userData.error = '';
            console.log(userData);
          },
        },
      ],
      {
        cancelable: false,
      },
    );
  };
  // ************************************************//
  // ************ END OF EVENT HANDLERS *********//
  // ************************************************//

  return (
    <Container style={styles.container}>
      <Content>
        <GoogleSigninButton
          style={{width: 192, height: 48}}
          size={GoogleSigninButton.Size.Wide}
          color={GoogleSigninButton.Color.Dark}
          onPress={handleGoogleButtonClick}
        />

        <Form style={styles.form}>
          <H1 style={styles.textCentered}>Login</H1>
          <Item stackedLabel>
            <Label>Email*</Label>
            {loginError.email.error && (
              <Label style={styles.textFieldError}>
                {loginError.email.message}
              </Label>
            )}
            <Input
              autoCapitalize="none"
              onChangeText={(val) => handleLoginInputChanges('email', val)}
            />
          </Item>
          <Item stackedLabel last>
            <Label>Password*</Label>
            {loginError.password.error && (
              <Label style={styles.textFieldError}>
                {loginError.password.message}
              </Label>
            )}
            <Input
              secureTextEntry
              onChangeText={(value) =>
                handleLoginInputChanges('password', value)
              }
            />
          </Item>
        </Form>
        <Button transparent>
          <Text>Forgot Password</Text>
        </Button>

        <Button
          block
          style={{margin: 15, marginTop: 50}}
          onPress={handleLoginButtonClick}>
          {userData.loading === true ? (
            (console.log(userData),
            (<ActivityIndicator size="small" color="#00ff00" />))
          ) : (
            <Text>Sign in</Text>
          )}
        </Button>
        {userData.isLoggedin === 'True' || userData.googleisLoggedin === 'True'
          ? checkisLoggedIn()
          : null}
        {userData.error !== '' && userData.errorStatus === 'True'
          ? showAlertErrorMessage(userData.error)
          : null}
      </Content>
    </Container>
  );
};

export default Login;
