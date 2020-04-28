import React, {useEffect} from 'react';
import {Text} from 'react-native';
import {Container, Header, Content, Card, CardItem, Body} from 'native-base';
import {useSelector, useDispatch} from 'react-redux';
import {fetchUsers} from '../../redux';

const Dashboard = () => {
  const userData = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUsers());
  });

  return (
    <Container>
      <Header />
      <Content>
        <Card>
          <CardItem>
            <Body>
              <Text>Using Redux and Native Base</Text>
              {userData.loading ? (
                <Text>Fetching data</Text>
              ) : (
                userData.users.map((user) => <Text>{user.name}</Text>)
              )}
            </Body>
          </CardItem>
        </Card>
      </Content>
    </Container>
  );
};

export default Dashboard;
