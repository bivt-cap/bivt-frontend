import React from 'react';
import {
  Container,
  Header,
  Content,
  Button,
  ListItem,
  Text,
  Icon,
  Left,
  Body,
  Right,
} from 'native-base';

const Spendings = () => {
  return (
    <Container>
      <Content>
        <ListItem icon>
          <Left>
            <Button style={{backgroundColor: '#FF9501'}}>
              <Icon active name="book" />
            </Button>
          </Left>
          <Body>
            <Text>Bought books</Text>
          </Body>
          <Right>
            <Text>$100</Text>
          </Right>
        </ListItem>
        <ListItem icon>
          <Left>
            <Button style={{backgroundColor: '#007AFF'}}>
              <Icon active name="build" />
            </Button>
          </Left>
          <Body>
            <Text>Car repair</Text>
          </Body>
          <Right>
            <Text>$80</Text>
          </Right>
        </ListItem>
        <ListItem icon>
          <Left>
            <Button style={{backgroundColor: '#007AFF'}}>
              <Icon active name="beer" />
            </Button>
          </Left>
          <Body>
            <Text>Lunch with Yalcin</Text>
          </Body>
          <Right>
            <Text>$30</Text>
          </Right>
        </ListItem>
      </Content>
    </Container>
  );
};

export default Spendings;
