import React, {useEffect, useState, useCallback} from 'react';
import {StyleSheet} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {Container, Content, Text, Card, Button} from 'native-base';
import {
  loginUser,
  googleSignIn,
  ReadJWTtoAsyncFromStorage,
  deleteJTWFromKeyChain,
} from '../../redux';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-community/google-signin';

const DashBoard = ({route, navigation}) => {
  const userData = useSelector((state) => state.login);
  const dispatch = useDispatch();
  console.log(userData);
  const {loginInfo} = route.params;

  const handleLogoutButtonClick = async () => {
    try {
      //If user authenticate with google oAuth
      if (userData.googleisLoggedin === 'True') {
        await GoogleSignin.revokeAccess();
        await GoogleSignin.signOut();
        userData.googleisLoggedin = 'False';
        navigation.navigate('Login');
        console.log(userData);
        //If user authenticate with local sign in.
      } else if (userData.isLoggedin === 'True') {
        deleteJTWFromKeyChain();
        if (deleteJTWFromKeyChain()) {
          userData.isLoggedin = 'False';
          console.log(userData);
          navigation.navigate('Login');
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container style={styles.container}>
      <Content>
        {Object.keys(loginInfo).length === 0 ? (
          <Text>Welcome Google </Text>
        ) : (
          <Card>
            <Text>Welcome {loginInfo.email} </Text>
            <Text>Name {loginInfo.firstName} </Text>
            <Text>Surname {loginInfo.lastName} </Text>
          </Card>
        )}

        <Button light onPress={handleLogoutButtonClick}>
          <Text> Logout </Text>
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
