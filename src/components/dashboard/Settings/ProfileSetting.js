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
  Thumbnail,
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
    alignItems: 'center',
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
  profileImage: {
    width: 100,
    height: 100,

    borderWidth: 1,
    borderColor: 'purple',
  },
});
const ProfileSetting = ({route, navigation}) => {
  // Dispatch - Redux hook

  const {userInfo} = route.params;
  console.log(userInfo);
  // Default image
  const uri = 'https://facebook.github.io/react-native/docs/assets/favicon.png';

  return (
    <Container style={settingStyles.container}>
      <View style={{flex: 1}}>
        <Card style={settingStyles.firstCard}>
          <ListItem>
            <Thumbnail
              circular
              style={settingStyles.profileImage}
              source={{uri: userInfo.photoUrl ? userInfo.photoUrl : uri}}
            />
          </ListItem>
        </Card>
        <Card style={settingStyles.secondCard}>
          <ListItem icon>
            <Left>
              <Button style={{backgroundColor: 'rgb(165,59,186)'}}>
                <Icon active name="person" />
              </Button>
            </Left>
            <Body>
              <Text>
                {userInfo.firstName} {userInfo.lastName}
              </Text>
            </Body>
          </ListItem>
          <ListItem icon>
            <Left>
              <Button style={{backgroundColor: 'rgb(165,59,186)'}}>
                <Icon active name="mail" />
              </Button>
            </Left>
            <Body>
              <Text>{userInfo.email}</Text>
            </Body>
          </ListItem>
        </Card>
      </View>
    </Container>
  );
};
export default ProfileSetting;
