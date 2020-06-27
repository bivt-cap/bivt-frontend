import React, {useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {
  Container,
  Content,
  Text,
  Button,
  Card,
  CardItem,
  Body,
} from 'native-base';
import {deleteJTWFromKeyChain, resetBootstrap} from '../../redux';
import {GoogleSignin} from '@react-native-community/google-signin';
import * as TaskManager from 'expo-task-manager';
import {postMemberLocationsToDB} from '../../redux';
import JwtKeyChain from '../../utils/jwtKeyChain';
import * as Location from 'expo-location';
import {Platform} from 'react-native';

const DashBoard = ({route, navigation}) => {
  // Dispatch - Redux hook
  const dispatch = useDispatch();
  // Stored State - Redux hook
  const bootstrapState = useSelector((state) => state.bootstrap);
  const userData = useSelector((state) => state.login);
  console.log(bootstrapState);

  const trackLocationInBackGround = async () => {
    if (Platform.OS === 'android') {
      console.log('sadasd');
      await Location.startLocationUpdatesAsync('watchLocation', {
        accuracy: Location.Accuracy.Balanced,
        timeInterval: 10000,
      });
    } else if (Platform.OS === 'ios') {
      await Location.startLocationUpdatesAsync('watchLocation', {
        accuracy: Location.Accuracy.High,
        distanceInterval: 1000,
      });
    }
  };
  trackLocationInBackGround();
  const postLocation = async (userCoord) => {
    const token = await JwtKeyChain.read();

    dispatch(postMemberLocationsToDB(token, userCoord));
  };

  const handleChatButtonClick = async () => {
    navigation.navigate('Chat', {userInfo: bootstrapState.user});
  };

  const handleTodoListButtonClick = async () => {
    navigation.navigate('TodoList', {userInfo: bootstrapState.user});
  };
  const handleTrackUserButton = async () => {
    navigation.navigate('TrackUser', {userInfo: bootstrapState.user});
  };
  const handleLogoutButtonClick = async () => {
    try {
      //If user authenticate with google oAuth
      if (userData.googleisLoggedin === 'True') {
        await GoogleSignin.revokeAccess();
        await GoogleSignin.signOut();
        userData.googleisLoggedin = 'False';
        //navigation.navigate('Login');
        //console.log(userData);
        //If user authenticate with local sign in.
      } else if (userData.isLoggedin === 'True') {
        //deleteJTWFromKeyChain();
        //if (deleteJTWFromKeyChain()) {
        userData.isLoggedin = 'False';
        userData.loginDetails = '';
        //console.log(userData);
        //navigation.navigate('Login');
        //}
      }
      deleteJTWFromKeyChain();
      dispatch(resetBootstrap());
      navigation.navigate('Bootstrap');
    } catch (error) {
      console.error(error);
    }
  };

  /*
   * This Task Manager read `watchLocation` task from trackUserAction and update state when the application in background
   * Details: https://docs.expo.io/versions/latest/sdk/task-manager/
   */

  TaskManager.defineTask('watchLocation', ({data, error}) => {
    if (error) {
      console.log('ERR');
      return;
    }
    if (data) {
      console.log('RUNNED tasks in background');

      const {locations} = data;
      console.log(data);
      postLocation(locations);
    }
  });

  return (
    <Container>
      <Content padder>
        <Card>
          <CardItem header bordered>
            <Text>User</Text>
          </CardItem>
          <CardItem bordered>
            <Body>
              <Text>Email: {bootstrapState.user.email}</Text>
              <Text>First Name: {bootstrapState.user.firstName}</Text>
              <Text>Last Name: {bootstrapState.user.lastName}</Text>
              <Text>Photo URL: {bootstrapState.user.photoUrl}</Text>
              <Text>Date of Birth: {bootstrapState.user.dateOfBirth}</Text>
            </Body>
          </CardItem>
        </Card>
        <Card>
          <CardItem header bordered>
            <Text>Circle</Text>
          </CardItem>
          <CardItem bordered>
            <Body>
              <Text>Id: {bootstrapState.circles[0].id}</Text>
              <Text>Name: {bootstrapState.circles[0].name}</Text>
              <Text>Is Admin: {bootstrapState.circles[0].isAdmin}</Text>
              <Text>Is Owner: {bootstrapState.circles[0].isOwner}</Text>
              <Text>Joined On: {bootstrapState.circles[0].joinedOn}</Text>
            </Body>
          </CardItem>
        </Card>
        <Button onPress={handleLogoutButtonClick}>
          <Text> Logout </Text>
        </Button>
        <Button onPress={handleChatButtonClick}>
          <Text> Chat </Text>
        </Button>
        <Button onPress={handleTodoListButtonClick}>
          <Text> TodoList </Text>
        </Button>
        <Button onPress={handleTrackUserButton}>
          <Text> Track User </Text>
        </Button>
      </Content>
    </Container>
  );
};

export default DashBoard;
