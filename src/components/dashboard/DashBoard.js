// React
import React from 'react';

// React Native
import {StyleSheet, Image} from 'react-native';

// Native Base
import {Container, Content, Body, Platform} from 'native-base';

// Redux
import {useDispatch, useSelector} from 'react-redux';
import {postMemberLocationsToDB} from '../../redux';

// Expo
import * as TaskManager from 'expo-task-manager';
import * as Location from 'expo-location';

// Token Key Chain
import JwtKeyChain from '../../utils/jwtKeyChain';

// Layout
import PluginButton from '../layout/pluginButton/PluginButton';
import FooterBase from '../layout/footerBase/FooterBase';

// Style
const dashboardStyles = StyleSheet.create({
  container: {backgroundColor: '#F7F7F7'},
  image: {
    height: 200,
    marginBottom: 20,
  },
  body: {
    flex: 1,
    justifyContent: 'space-between',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
});

const DashBoard = ({route, navigation}) => {
  // Dispatch - Redux hook
  const dispatch = useDispatch();

  // Stored State - Redux hook
  const bootstrapState = useSelector((state) => state.bootstrap);

  // Handle PluginClick
  const handlePluginClick = async (pluginId) => {
    switch (pluginId) {
      case 1: // Calendar
        navigation.navigate('Calendar', {userInfo: bootstrapState.user});
        break;
      case 2: // To-do List
        navigation.navigate('TodoList', {userInfo: bootstrapState.user});
        break;
      case 3: // Grocery List
        navigation.navigate('GroceryList', {userInfo: bootstrapState.user});
        break;
      case 4: // Tracking
        navigation.navigate('TrackUser', {userInfo: bootstrapState.user});
        break;
      case 5: // Polling
        navigation.navigate('Polling', {userInfo: bootstrapState.user});
        break;
      case 6: // Messages
        navigation.navigate('Chat', {userInfo: bootstrapState.user});
        break;
      case 7: // Expenses
        navigation.navigate('ExpenseManager', {userInfo: bootstrapState.user});
        break;
      default:
        break;
    }
  };

  // Tracking user
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

  // Start tracking the user location
  trackLocationInBackGround();

  // Post user Location
  const postLocation = async (userCoord) => {
    const token = await JwtKeyChain.read();

    dispatch(postMemberLocationsToDB(token, userCoord));
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

  // Set the navigation title
  navigation.setOptions({title: bootstrapState.circles[0].name});

  // Render the screen
  return (
    <Container style={dashboardStyles.container}>
      <Image
        source={require('../../assets/images/plugins/Rommate2.png')}
        style={dashboardStyles.image}
      />
      <Content>
        <Body style={dashboardStyles.body}>
          {bootstrapState.circles[0].plugins.map((pluginId) => {
            return (
              <PluginButton
                pluginId={pluginId}
                eventHandler={() => handlePluginClick(pluginId)}
              />
            );
          })}
        </Body>
      </Content>
      <FooterBase navigation showExit />
    </Container>
  );
};

/*
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
              <Text>Members:</Text>
              <List>
                {bootstrapState.circles[0].members.map((member) => {
                  return (
                    <ListItem>
                      <Text>{member.userFirstName}</Text>
                    </ListItem>
                  );
                })}
              </List>
              <Text>Plugins:</Text>
              <List>
                {bootstrapState.circles[0].plugins.map((pluginId) => {
                  return <PluginButton pluginId={pluginId} />;
                })}
              </List>
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
        <Button onPress={handleExpensesButton}>
          <Text> Expenses Plugin </Text>
        </Button>
*/

export default DashBoard;
