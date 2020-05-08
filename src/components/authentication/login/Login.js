import React, {useEffect, useState, useCallback} from 'react';
import {StyleSheet} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {loginUser} from '../../../redux';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {
  Container,
  Header,
  Title,
  Spinner,
  Content,
  Button,
  Item,
  Label,
  Input,
  H1,
  Body,
  Left,
  Right,
  Icon,
  Form,
  Text,
} from 'native-base';

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

  const handleLoginButtonClick = () => {
    dispatch(loginUser(loginData));
    if (userData.loginDetails === 'Login Sucess') {
      //Simple navigation to signup page
      navigation.navigate('SignUp', loginData);
    }
  };

  return (
    <Container style={styles.container}>
      <Content>
        <Form style={styles.form}>
          <H1 style={styles.textCentered}>Login</H1>
          <Item stackedLabel>
            <Label>Email</Label>
            <Input
              onChangeText={(val) => handleLoginInputChanges('email', val)}
            />
          </Item>
          <Item stackedLabel last>
            <Label>Password</Label>
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
  textContent: {
    fontSize: 20,
    color: 'red',
  },
  textCentered: {
    textAlign: 'center',
  },
});

export default Login;
