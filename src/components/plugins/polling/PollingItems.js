import React from 'react';
import PollingStyle from './PollingStyle';
import {Text, Card, Body, CardItem, Icon} from 'native-base';
import AsyncStorage from '@react-native-community/async-storage';

const PollingItems = (props) => (
  <Card style={PollingStyle.cardStyle}>
    <CardItem>
      <Body style={PollingStyle.pollingItem}>
        <Text style={PollingStyle.title}>{props.qst}</Text>
        <Text>{props.vote} Voted</Text>
      </Body>
      <Icon
        name="ios-cog"
        onPress={() => {
          AsyncStorage.clear();
        }}
      />
    </CardItem>
  </Card>
);
export default PollingItems;
