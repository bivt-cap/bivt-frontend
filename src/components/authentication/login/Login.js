import React, {useEffect, useState, useCallback} from 'react';
import {StyleSheet} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {loginUser} from '../../../redux';
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
  // console.log('yalcin', userData);
  const dispatch = useDispatch();

  const [loginData, setloginData] = useState({
    email: '',
    password: '',
  });

  const checkisLoggedIn = () => {
    if (userData.isLoggedin === 'True') {
      navigation.navigate('DashBoard', loginData);
    } else {
      console.log('NOT LOGIN');
    }
  };
  const handleLoginInputChanges = (key, value) => {
    setloginData((prevState) => {
      return {
        ...prevState,
        [key]: value,
      };
    });
  };

  const [loginError, setloginError] = useState({
    email: {
      error: false,
    },
    password: {
      error: false,
    },
    firstRender: true,
  });

  const handleLoginButtonClick = () => {
    setloginError(loginFormValidation(loginData));
    // dispatch(loginUser(loginData));
    if (userData.loginDetails === 'Login Sucess') {
      //Simple navigation to signup page
      navigation.navigate('Login', loginData);
    }
  };
  //When there is no error at validation , run dispatch function and login
  // firstRender prob helps to stop sending fetch request when the app first render.
  useEffect(() => {
    console.log(loginData);
    if (
      !loginError.email.error &&
      !loginError.password.error &&
      !loginError.firstRender
    ) {
      dispatch(loginUser(loginData));
    }
  }, [loginError, loginData, dispatch]);

  return (
    <Container style={styles.container}>
      <Content>
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
          <Text>Sign In</Text>
        </Button>
        {userData.isLoggedin === 'True' ? (
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
