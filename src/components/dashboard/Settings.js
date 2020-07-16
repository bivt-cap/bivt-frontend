import React from 'react';
import {StyleSheet, Image} from 'react-native';
import {Platform, Dimensions, PixelRatio} from 'react-native';
import {
  View,
  Text,
  Container,
  Content,
  Button,
  List,
  ListItem,
  Separator,
  CardItem,
  Left,
  Switch,
  Card,
  Icon,
  Right,
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
  text: {
    color: '#000',
  },
});
const Settings = () => {
  return (
    <Container style={settingStyles.container}>
      <View style={{flex: 1}}>
        <Card style={settingStyles.firstCard}>
          <ListItem icon>
            <Left>
              <Button style={{backgroundColor: '#FF9501'}}>
                <Icon active name="airplane" />
              </Button>
            </Left>
            <Body>
              <Text>Profile</Text>
            </Body>
          </ListItem>
          <ListItem icon>
            <Left>
              <Button style={{backgroundColor: '#007AFF'}}>
                <Icon active name="wifi" />
              </Button>
            </Left>
            <Body>
              <Text>Change Password</Text>
            </Body>
          </ListItem>
        </Card>
        <Card style={settingStyles.secondCard}>
          <ListItem icon>
            <Left>
              <Button style={{backgroundColor: '#FF9501'}}>
                <Icon active name="airplane" />
              </Button>
            </Left>
            <Body>
              <Text>Group</Text>
            </Body>
          </ListItem>
          <ListItem icon>
            <Left>
              <Button style={{backgroundColor: '#007AFF'}}>
                <Icon active name="wifi" />
              </Button>
            </Left>
            <Body>
              <Text>Notification</Text>
            </Body>
          </ListItem>
          <ListItem icon>
            <Left>
              <Button style={{backgroundColor: '#007AFF'}}>
                <Icon active name="wifi" />
              </Button>
            </Left>
            <Body>
              <Text>Help</Text>
            </Body>
          </ListItem>
        </Card>
        <Card style={settingStyles.thirdCard}>
          <ListItem icon>
            <Left>
              <Button style={{backgroundColor: '#FF9501'}}>
                <Icon active name="airplane" />
              </Button>
            </Left>
            <Body>
              <Text>Logout</Text>
            </Body>
          </ListItem>
        </Card>
      </View>
    </Container>
  );
};
export default Settings;
