/* eslint-disable react-hooks/exhaustive-deps */
// React
import React, {useEffect} from 'react';

// React Native
import {
  StyleSheet,
  Image,
  Platform,
  TouchableOpacity,
  Dimensions,
} from 'react-native';

// Native Base
import {
  Container,
  Content,
  Body,
  Card,
  CardItem,
  Icon,
  Text,
} from 'native-base';

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

// Image Map
import {ImageDefaultGroup} from '../../utils/ImageMap';

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
  addTouchableOpacity: {
    width: Dimensions.get('window').width / 2 - 20,
  },
  addCardItem: {
    flex: 1,
    flexDirection: 'column',
    padding: 16,
    borderWidth: 1,
    borderColor: '#CA60E3',
  },
  addText: {
    textAlign: 'left',
    width: '100%',
    color: '#fff',
  },
  addIcon: {
    fontSize: 30,
    width: 50,
    height: 50,
    textAlign: 'center',
    textAlignVertical: 'center',
    color: '#CA60E3',
    borderWidth: 1,
    borderRadius: 50,
    borderColor: '#CA60E3',
    marginTop: 20,
    marginBottom: 20,
  },
});

const DashBoard = ({route, navigation}) => {
  // Dispatch - Redux hook
  const dispatch = useDispatch();

  // Stored State - Redux hook
  const bootstrapState = useSelector((state) => state.bootstrap);

  useEffect(() => {
    // Set the navigation title
    navigation.setOptions({title: bootstrapState.circles[0].name});
  }, []);

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
      return;
    }
    if (data) {
      const {locations} = data;
      postLocation(locations);
    }
  });

  const handleAddNewPlugin = () => {
    navigation.navigate('AddRemovePlugin');
  };

  // Render the screen
  return (
    <Container style={dashboardStyles.container}>
      <Image
        source={
          ImageDefaultGroup.find(
            (img) => img.name === bootstrapState.circles[0].image,
          ).source
        }
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
          {bootstrapState.circles[0].plugins.length < 7 ? (
            <TouchableOpacity
              onPress={() => handleAddNewPlugin()}
              style={dashboardStyles.addTouchableOpacity}>
              <Card pointerEvents="none">
                <CardItem cardBody style={dashboardStyles.addCardItem}>
                  <Text style={dashboardStyles.addText}>Add</Text>
                  <Icon
                    ios="ios-add"
                    android="md-add"
                    style={dashboardStyles.addIcon}
                  />
                </CardItem>
              </Card>
            </TouchableOpacity>
          ) : null}
        </Body>
      </Content>
      <FooterBase navigation={navigation} showExit />
    </Container>
  );
};

export default DashBoard;
