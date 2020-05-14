import React, {useEffect} from 'react';
import {StyleSheet} from 'react-native';
import { Field, reduxForm } from 'redux-form';
import {useSelector, useDispatch} from 'react-redux';
import {fetchUsers, fetchUsersAsync} from '../../redux';
import {
  Container,
  Header,
  Title,
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

const Login = (props) => {
  const userData = useSelector((state) => state);
  const dispatch = useDispatch();
  // console.log(props);
  useEffect(() => {
    console.log(userData);
    dispatch(fetchUsersAsync());
  },[]);

  return (
    <Container style={styles.container}>
      <Content>
        <Form style={styles.form}>
          <H1 style={styles.textCentered}>Login</H1>
          <Item stackedLabel>
            <Label>Username</Label>
            <Input />
          </Item>
          <Item stackedLabel last>
            <Label>Password</Label>
            <Input secureTextEntry />
          </Item>
        </Form>
        <Button transparent>
          <Text>Forgot Password</Text>
        </Button>
        <Button block style={{margin: 15, marginTop: 50}}>
          <Text>Sign In</Text>
        </Button>
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

export default reduxForm({
  form: 'loginForm',
})(Login);
