import React from 'react';
import PollingStyle from './PollingStyle';
import {Text, 
        View, 
        Card,
        Body,
        CardItem,
        } from 'native-base';


const PollingItems = (props) => (
  <Card style={PollingStyle.cardStyle}>
    <CardItem >

      <Body style={PollingStyle.pollingItem}>
          <Text style={PollingStyle.title}>{props.qst}</Text>
          <Text>{props.vote} Voted</Text>
      </Body>

    </CardItem>
  </Card>

);
export default PollingItems;



