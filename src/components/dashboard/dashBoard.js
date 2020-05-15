import React, {useEffect, useState, useCallback} from 'react';
import {StyleSheet} from 'react-native';
import {deleteJWTfromAsyncStorage} from '../../redux';
import {useSelector, useDispatch} from 'react-redux';
import {Container, Content, Text, Card, Button} from 'native-base';

const handleLogoutButtonClick = () => {
  deleteJWTfromAsyncStorage();
  if (deleteJWTfromAsyncStorage()) {
    console.log('logout');
    // nav.navigate('DashBoard');
  }
};

const DashBoard = ({route, navigation}) => {
  const userData = useSelector((state) => state.login);
  console.log('Dash', userData);
  // console.log(route.params);
  const {loginInfo} = route.params;
  // let userFullName = userParams.userData.loginDetails.user.name;
  // console.log(loginInfo);
  return (
    <Container style={styles.container}>
      <Content>
        {Object.keys(loginInfo).length === 0 ? (
          <Text>Welcome Google </Text>
        ) : (
          <Card>
            <Text>Welcome {loginInfo.email} </Text>
            <Text>
              {/* GOOLGE ICIN BILGILERI BACKENDDEN AL */}
              Welcome {`${loginInfo.firstName} ${loginInfo.lastName}`}{' '}
            </Text>
          </Card>
        )}

        <Button light onPress={handleLogoutButtonClick}>
          <Text> Light </Text>
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

export default DashBoard;
