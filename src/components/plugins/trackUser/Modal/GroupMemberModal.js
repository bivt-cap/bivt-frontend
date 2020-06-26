import React from 'react';
import {Text, Left, Card, CardItem, ListItem, Icon} from 'native-base';
import styles from '../trackUserStyle';

const GroupMemberModal = (props) => {
  const {userFirstName, userLastName, focusMarker, lastUpdated} = props;

  return (
    <Card>
      <CardItem button onPress={focusMarker} style={{height: 80}}>
        {/* <Left>
          <Thumbnail
            style={styles.photo}
            source={{uri: 'https://placeimg.com/140/140/any'}}
          />
        </Left> */}
        <Left>
          <Text style={styles.textContent}>
            {userFirstName} {userLastName}
          </Text>
        </Left>
        <Icon type="MaterialIcons" style={{color: 'purple'}} name="explore" />
      </CardItem>
      <ListItem itemDivider>
        <Text>{lastUpdated}</Text>
      </ListItem>
    </Card>
  );
};

export default GroupMemberModal;
