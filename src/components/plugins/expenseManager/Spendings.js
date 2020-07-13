/**
 * This component is responsible to load data in spending tabs
 *
 * @version 0.0.1
 * @author Arshdeep Singh (https://github.com/Singh-Arshdeep)
 */
//react
import React from 'react';

//native base
import {Container, Content, ListItem, Body, Right, Text, View} from 'native-base';

//styles
import {expenseManagerStyles} from './ExpenseManagerStyles';

const Spendings = (props) => {
  return (
      <>
        <ListItem itemDivider style={expenseManagerStyles.listTop}>
          <Body>
            <Text>Total</Text>
          </Body>
          <Right>
            <Text>${props.sum}</Text>
          </Right>
        </ListItem>

        {props.data}
      </>
  );
};

export default Spendings;
