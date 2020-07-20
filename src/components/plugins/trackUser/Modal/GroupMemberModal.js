import React from 'react';
import {Text, Left, Card, CardItem, ListItem, Icon, View} from 'native-base';
import styles from '../trackUserStyle';

const GroupMemberModal = (props) => {
  const {userFirstName, userLastName, focusMarker, lastUpdated} = props;

  return (
    <View style={styles.viewStyle}>
      <Card style={styles.cardStyle}>
        <CardItem button onPress={focusMarker} style={styles.groupPaper}>
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
    </View>
  );
};

export default GroupMemberModal;
