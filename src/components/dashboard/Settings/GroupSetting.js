import React from 'react';
import {StyleSheet} from 'react-native';
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
// Redux
import {useSelector} from 'react-redux';
// Image Map
import {ImageDefaultGroup} from '../../../utils/ImageMap';

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
  avatar: {
    width: 40,
    height: 40,
  },
});
const GroupSetting = ({route, navigation}) => {
  // Dispatch - Redux hook

  const {circleInfo} = route.params;

  // Stored State - Redux hook
  const bootstrapState = useSelector((state) => state.bootstrap);
  console.log(bootstrapState);
  // Default image
  const uri = 'https://facebook.github.io/react-native/docs/assets/favicon.png';
  // Stored State - Redux hook

  // Logout Handler
  // console.log(circleInfo);
  return (
    <Container style={settingStyles.container}>
      <View style={{flex: 1}}>
        <Card style={settingStyles.firstCard}>
          <ListItem>
            <Thumbnail
              circular
              style={settingStyles.profileImage}
              source={
                ImageDefaultGroup.find(
                  (img) => img.name === bootstrapState.circles[0].image,
                ).source
              }
            />
          </ListItem>
        </Card>
        <Card style={settingStyles.secondCard}>
          <ListItem Thumbnail>
            <Button
              style={{backgroundColor: 'rgb(165,59,186)', borderRadius: 7}}>
              <Icon active name="people" />
            </Button>

            <Body>
              <Text style={{fontSize: 20, textAlign: 'left'}}>
                {circleInfo.name}
              </Text>
            </Body>
          </ListItem>
        </Card>
        <Card style={settingStyles.secondCard}>
          {circleInfo.members.map((members) => {
            return (
              <ListItem thumbnail>
                <Left>
                  <Thumbnail
                    circular
                    style={settingStyles.avatar}
                    source={{
                      uri: members.photoUrl ? members.photoUrl : uri,
                    }}
                  />
                </Left>
                <Body>
                  <Text>
                    {members.userFirstName} {members.userLastName}
                  </Text>
                </Body>
              </ListItem>
            );
          })}
        </Card>
      </View>
    </Container>
  );
};
export default GroupSetting;
