import React from 'react';
import {
  Container,
  View,
  Text,
  Header,
  Content,
  Left,
  Thumbnail,
  Card,
  CardItem,
  Icon,
  Right,
} from 'native-base';
import styles from '../trackUserStyle';
import {Alert} from 'react-native';

const GroupMemberModal = (props) => {
  const {userFirstName, userLastName, focusMarker} = props;

  return (
    <Card>
      <CardItem button onPress={focusMarker} style={{height: 60}}>
        <Left>
          <Thumbnail
            style={styles.photo}
            source={{uri: 'https://placeimg.com/140/140/any'}}
          />
        </Left>
        <Text style={styles.textContent}>
          {userFirstName} {userLastName}
        </Text>
        <Right>
          <Icon name="arrow-forward" />
        </Right>
      </CardItem>
    </Card>
  );
};

export default GroupMemberModal;
