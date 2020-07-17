import React from 'react';
import {StyleSheet, Image, Alert} from 'react-native';

// Redux
import {useSelector, useDispatch} from 'react-redux';
import {deleteJTWFromKeyChain, resetBootstrap} from '../../../redux';
import {GoogleSignin} from '@react-native-community/google-signin';
import {
  View,
  Text,
  Container,
  Button,
  ListItem,
  Left,
  Card,
  Icon,
  Body,
} from 'native-base';

const settingStyles = StyleSheet.create({
  container: {
    backgroundColor: '#F7F7F7',
  },

  firstCard: {
    marginTop: '10%',
  },
  secondCard: {
    marginTop: '5%',
  },
  thirdCard: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 60,
  },
});
const Settings = ({navigation}) => {
  // Dispatch - Redux hook
  const dispatch = useDispatch();

  // Stored State - Redux hook
  const userData = useSelector((state) => state.login);
  const bootstrapState = useSelector((state) => state.bootstrap);
  console.log(bootstrapState);
  // Logout Handler
  const handleLogoutButtonClick = async () => {
    try {
      //If user authenticate with google oAuth
      if (userData.googleisLoggedin === 'True') {
        await GoogleSignin.revokeAccess();
        await GoogleSignin.signOut();
        userData.googleisLoggedin = 'False';
      } else if (userData.isLoggedin === 'True') {
        userData.isLoggedin = 'False';
        userData.loginDetails = '';
      }
      deleteJTWFromKeyChain();
      dispatch(resetBootstrap());
      navigation.navigate('Bootstrap');
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <Container style={settingStyles.container}>
      <View style={{flex: 1}}>
        <Card style={settingStyles.firstCard}>
          <ListItem
            icon
            onPress={() => {
              navigation.navigate('ProfileSetting', {
                userInfo: bootstrapState.user,
              });
            }}>
            <Left>
              <Button style={{backgroundColor: 'rgb(165,59,186)'}}>
                <Icon active name="person" />
              </Button>
            </Left>
            <Body>
              <Text>Profile</Text>
            </Body>
          </ListItem>
          <ListItem icon>
            <Left>
              <Button style={{backgroundColor: 'rgb(165,59,186)'}}>
                <Icon active name="lock" />
              </Button>
            </Left>
            <Body>
              <Text>Change Password</Text>
            </Body>
          </ListItem>
        </Card>
        <Card style={settingStyles.secondCard}>
          <ListItem
            icon
            onPress={() => {
              navigation.navigate('GroupSetting', {
                circleInfo: bootstrapState.circles[0],
              });
            }}>
            <Left>
              <Button style={{backgroundColor: 'rgb(165,59,186)'}}>
                <Icon active name="people" />
              </Button>
            </Left>
            <Body>
              <Text>Group</Text>
            </Body>
          </ListItem>
          <ListItem icon>
            <Left>
              <Button style={{backgroundColor: 'rgb(165,59,186)'}}>
                <Icon active name="notifications" />
              </Button>
            </Left>
            <Body>
              <Text>Notification</Text>
            </Body>
          </ListItem>
          <ListItem icon>
            <Left>
              <Button style={{backgroundColor: 'rgb(165,59,186)'}}>
                <Icon active name="question" />
              </Button>
            </Left>
            <Body>
              <Text>Help</Text>
            </Body>
          </ListItem>
        </Card>
        <Card style={settingStyles.thirdCard}>
          <ListItem
            icon
            button={true}
            onPress={() => {
              handleLogoutButtonClick();
            }}>
            <Left>
              <Button style={{backgroundColor: 'rgb(165,59,186)'}}>
                <Icon active name="log-out" />
              </Button>
            </Left>
            <Body>
              <Text onC>Logout</Text>
            </Body>
          </ListItem>
        </Card>
      </View>
    </Container>
  );
};
export default Settings;
