import React, {useEffect, useState, useCallback} from 'react';
import {StyleSheet, ActivityIndicator} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {
  loginUser,
  googleSignIn,
  checkGoogleSession,
  checkLocalSession,
  ReadJWTtoAsyncFromStorage,
  deleteJWTfromAsyncStorage,
} from '../../../redux';
import {GOOGLE_IOS_CLIENT_ID, GOOGLE_WEB_CLIENT_ID} from 'react-native-dotenv';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-community/google-signin';
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

    if (
      !loginError.email.error &&
      !loginError.password.error &&
      !loginError.firstRender
    ) {
      dispatch(loginUser(loginData));
    }
  }, [loginError, loginData, dispatch]);

  // **********************************************************//
  // ************ BEGININ OF FUNCTIONS DECLARATIONS ***********//
  // **********************************************************//

  const checkTheTokenisValid = () => {
    //CODE:I need to send existing token information to the backend for session . If it is token is match , redirect to page.
    //If the token's are different redirect to login page.
    ReadJWTtoAsyncFromStorage();
  };

  // normal login and google login check seperately and pass different params to the dash.
  // Naviget to Dasboard Feature.
  const checkisLoggedIn = () => {
    if (userData.isLoggedin === 'True') {
      navigation.navigate('DashBoard', {loginInfo: userData.loginDetails});
    } else if (userData.googleisLoggedin === 'True') {
      //get data from DB not google.
      navigation.navigate('DashBoard', {
        loginInfo: userData.googleLoginDetails.user,
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
          // disabled={this.state.isSigninInProgress}
        />
        {/* <Button block style={{margin: 15, marginTop: 50}} onPress={signOut}>
          <Text>Sign In</Text>
        </Button> */}
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
        {userData.isLoggedin === 'True' ||
        userData.googleisLoggedin === 'True' ? (
          checkisLoggedIn()
        ) : (
          <Text>{userData.error}</Text>
        )}
      </Content>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#C4E7F4',
    position: 'absolute',
    width: '100%',
    marginLeft: 'auto',
    marginRight: 'auto',
    padding: 10,
  },
  form: {
    marginTop: '50%',
  },
  textFieldError: {
    color: 'red',
    fontSize: 14,
  },
  textContent: {
    fontSize: 20,
    color: 'red',
  },
  textCentered: {
    textAlign: 'center',
  },
});

export default Login;
