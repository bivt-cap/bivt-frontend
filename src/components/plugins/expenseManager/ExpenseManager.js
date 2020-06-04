/**
 * Expense Manager plugin
 *
 * @version 0.0.1
 * @author Arshdeep Singh (https://github.com/Singh-Arshdeep)
 */
import React, {useState} from 'react';
import {
  Container,
  Tabs,
  Tab,
  Fab,
  Icon,
  Card,
  Right,
  CardItem,
  Text,
  Content,
} from 'native-base';
import {Col, Row, Grid} from 'react-native-easy-grid';
import ExpenseManagerStyles from './ExpenseManagerStyles';
import Spendings from './Spendings';

const ExpenseManager = () => {
  const [active, setActive] = useState(false);
  return (
    <Container>
      <Content>
        <Grid>
          <Row size={20}>
            <Card style={{width: '100%'}}>
              <CardItem>
                <Icon active name="cash" />
                <Text>Total Spendings</Text>
                <Right>
                  <Text>$210</Text>
                </Right>
              </CardItem>
            </Card>
          </Row>
          <Row size={80}>
            <Tabs>
              <Tab heading="Spendings">
                <Tabs>
                  <Tab heading="Today">
                    <Spendings />
                  </Tab>
                  <Tab heading="This Week"></Tab>
                  <Tab heading="This Month"></Tab>
                  <Tab heading="This Year"></Tab>
                </Tabs>
              </Tab>
              <Tab heading="Budget">
                <Tabs>
                  <Tab heading="Weekly"></Tab>
                  <Tab heading="Monthly"></Tab>
                  <Tab heading="Yearly"></Tab>
                </Tabs>
              </Tab>
            </Tabs>
          </Row>
        </Grid>
      </Content>
      <Fab
        active={true}
        direction="up"
        containerStyle={{}}
        style={ExpenseManagerStyles.selectPluginButton}
        position="bottomRight"
        onPress={''}>
        <Icon name="add" useNativeDriver={false} />
      </Fab>
    </Container>
  );
};

export default ExpenseManager;
