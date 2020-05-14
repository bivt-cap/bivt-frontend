import React, {useEffect, useState, useCallback} from 'react';
import {StyleSheet} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
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

const DashBoard = ({route, navigation}) => {
  console.log(route.params);
  const {loginInfo} = route.params;
  // let userFullName = userParams.userData.loginDetails.user.name;
  console.log(loginInfo);
  return (
    <Container style={styles.container}>
      <Content>
        {Object.keys(loginInfo).length === 0 ? (
          <Text>Welcome Google </Text>
        ) : (
          <Text>Welcome {loginInfo.email} </Text>
        )}

        <Button title="Go back" onPress={() => navigation.navigate('Login')} />
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

export default DashBoard;
