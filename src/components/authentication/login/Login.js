/**
 * The component for Login and
 *
 * @version 0.0.1
 * @author Yalcin Tatar (https://github.com/yalcinos)
 */

// React
import React, {useEffect, useState} from 'react';

// React native
import {ActivityIndicator, Alert, Dimensions} from 'react-native';

// Redux
import {useSelector, useDispatch} from 'react-redux';
import {loginUser, googleSignIn, resetBootstrap} from '../../../redux';
import {GOOGLE_IOS_CLIENT_ID, GOOGLE_WEB_CLIENT_ID} from 'react-native-dotenv';
import {
  GoogleSignin,
  GoogleSigninButton,
} from '@react-native-community/google-signin';

import {
  Container,
  Content,
  Button,
  Item,
  Label,
  Input,
  Form,
  Text,
  Toast,
  Right,
} from 'native-base';
import {loginFormValidation} from './loginFormValidation';

// Styles
import styles from './loginStyles';

// Custom Layout
import HeaderWithLogo from '../../layout/headerWithLogo/HeaderWithLogo';

const Login = ({navigation}) => {
  const userData = useSelector((state) => state.login);
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

  useEffect(() => {
    GoogleSignin.configure({
      iosClientId: GOOGLE_IOS_CLIENT_ID,
      webClientId: GOOGLE_WEB_CLIENT_ID,
    });
    //dispatch(checkGoogleSession);
    //dispatch(checkLocalSession);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //When there is no error at validation , run dispatch function and login
  // firstRender prob helps to stop sending fetch request when the app first render.
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
  const checkisLoggedIn = () => {
    if (
      userData.isLoggedin === 'True' ||
      userData.googleisLoggedin === 'True'
    ) {
      dispatch(resetBootstrap());
      navigation.navigate('Bootstrap');
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
  };
  const handleForgotButtonClick = () => {
    navigation.navigate('ForgotPassword');
  };
  const handleSugnUpButtonClick = () => {
    navigation.navigate('SignUp');
  };
  const handleResendValidationEmailButtonClick = () => {
    navigation.navigate('ResendValidationEmail');
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

  if (loginError.email.error || loginError.password.error) {
    const erroMsg = `Error: 
    ${loginError.email.message}
    ${loginError.password.message}`;

    Toast.show({
      text: erroMsg.trim(),
      buttonText: 'OK',
    });
  }

  return (
    <Container>
      <HeaderWithLogo title="Log In" />
      <Content>
        <Form>
          <Label>Email</Label>
          <Item regular error={loginError.email.error}>
            <Input
              placeholder="Email"
              autoCapitalize="none"
              onChangeText={(val) => handleLoginInputChanges('email', val)}
            />
          </Item>
          <Label>Password</Label>
          <Item regular error={loginError.email.error} last>
            <Input
              placeholder="Password"
              secureTextEntry
              onChangeText={(value) =>
                handleLoginInputChanges('password', value)
              }
            />
          </Item>
          <Button
            transparent
            dark
            onPress={handleForgotButtonClick}
            style={styles.forgotPasswordBtn}>
            <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
          </Button>
          <Button block onPress={handleLoginButtonClick}>
            {userData.loading === true ? (
              <ActivityIndicator size="small" color="#00ff00" />
            ) : (
              <Text>Sign in</Text>
            )}
          </Button>
        </Form>

        <Text style={styles.Or}>Or</Text>

        <GoogleSigninButton
          style={styles.GoogleSigninButton}
          size={GoogleSigninButton.Size.Wide}
          color={GoogleSigninButton.Color.Light}
          onPress={handleGoogleButtonClick}
        />

        <Button
          transparent
          dark
          onPress={handleSugnUpButtonClick}
          style={styles.forgotResendBtn}>
          <Text style={styles.forgotResendText}>New Member? Register Now</Text>
        </Button>

        <Button
          transparent
          dark
          onPress={handleResendValidationEmailButtonClick}
          style={styles.forgotResendBtn}>
          <Text style={styles.forgotResendText}>Resend Validation Email</Text>
        </Button>
        {userData.isLoggedin === 'True' || userData.googleisLoggedin === 'True'
          ? checkisLoggedIn()
          : userData.error !== '' && userData.errorStatus === 'True'
          ? showAlertErrorMessage(userData.error)
          : null}
      </Content>
    </Container>
  );
};

export default Login;
