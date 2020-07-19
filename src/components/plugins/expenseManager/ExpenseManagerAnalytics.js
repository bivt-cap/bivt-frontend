//react
import React from 'react';

//charts
import {ProgressCircle} from 'react-native-svg-charts';

//native base
import {
  Container,
  Content,
  Card,
  CardItem,
  Left,
  Right,
  Text,
} from 'native-base';

//styles
import {expenseManagerStyles, analyticStyles} from './ExpenseManagerStyles';

const ExpenseManagerAnalytics = ({route, navigation}) => {
  const {total} = route.params;
  const {remaining} = route.params;
  let val = (total - remaining) / total;
  let valPerc = ((total - (total - remaining)) / total) * 100;
  return (
    <>
      <Container style={expenseManagerStyles.container}>
        <Content style={expenseManagerStyles.content}>
          <ProgressCircle
            style={analyticStyles.progressCircle}
            progress={val}
            progressColor={'#A53BBA'}
            strokeWidth={20}
          />
        </Content>
      </Container>
      <Container>
        <Content>
          <Card>
            <CardItem>
              <Left>
                <Text>Budget Amount</Text>
              </Left>
              <Right>
                <Text>${parseFloat(total).toFixed(2)}</Text>
              </Right>
            </CardItem>
            <CardItem>
              <Left>
                <Text>Total Spent</Text>
              </Left>
              <Right>
                <Text>${parseFloat(total - remaining).toFixed(2)}</Text>
              </Right>
            </CardItem>
            <CardItem>
              <Left>
                <Text>Remaining Budget</Text>
              </Left>
              <Right>
                <Text>${remaining}</Text>
              </Right>
            </CardItem>
            <CardItem>
              <Left>
                <Text>Remaining %</Text>
              </Left>
              <Right>
                <Text>{parseFloat(valPerc).toFixed(0)}%</Text>
              </Right>
            </CardItem>
          </Card>
        </Content>
      </Container>
    </>
  );
};

export default ExpenseManagerAnalytics;
