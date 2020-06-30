/**
 * Expense Manager plugin
 *
 * @version 0.0.1
 * @author Arshdeep Singh (https://github.com/Singh-Arshdeep)
 */
//react
import React, {useState, useEffect} from 'react';

//react native
import {Text, Alert} from 'react-native';

//redux
import {useSelector, useDispatch} from 'react-redux';
import {getBills, removeBill, getBudgets, removeBudget} from '../../../redux';

//native base
import {
  Container,
  Tabs,
  Tab,
  Icon,
  Content,
  Fab,
  ListItem,
  Card,
  CardItem,
  Left,
  Body,
  Right,
  Button,
} from 'native-base';
import {Row, Grid} from 'react-native-easy-grid';

//etc
import moment from 'moment';

//styles
import {expenseManagerStyles} from './ExpenseManagerStyles';

//Components
import Spendingsmodal from './SpendingsModal';
import Spendings from './Spendings';
import BudgetModal from './BudgetModal';
import Budget from './Budget';
import expenseCategoryIcons from './expenseCategoryIcons';

// Token Key Chain
import JwtKeyChain from '../../../utils/jwtKeyChain';

const ExpenseManager = () => {
  const dispatch = useDispatch();
  const bootstrapState = useSelector((state) => state.bootstrap);
  const expenseManagerState = useSelector((state) => state.expenseManager);
  // ****************************************************//
  // ************ BEGINING OF STATES DECLARATIONS ******//
  // **************************************************//
  const [activeTab, setActiveTab] = useState(0);
  const [spendingsModalVisible, setSpendingsModalVisible] = useState(false);
  const [budgetModalVisible, setBudgetModalVisible] = useState(false);
  let budgetRemainingAmount = {};
  let sumBreakDown = {};
  let billAmountByDay = {};
  // ****************************************************//
  // ************ END OF STATES DECLARATIONS ***********//
  // **************************************************//

  // ****************************************************//
  // ************ BEGINING OF ACTIONS ******************//
  // **************************************************//

  //close modal
  const closeModal = () => {
    setSpendingsModalVisible(false);
    setBudgetModalVisible(false);
  };

  // ************ BILLS ******************//

  //fetch bills from the DB
  const fetchBills = async () => {
    const token = await JwtKeyChain.read();
    const circleId = bootstrapState.circles[0].id;
    dispatch(getBills(circleId, token));
  };

  //loads bills on the screen
  const loadBills = (interval) => {
    const now = moment.utc(new Date()).format('YYYY-MM-DD');
    let sum = 0;
    return expenseManagerState.loadBillsResponseDetails.bills.map((bill) => {
      billAmountByDay[moment(bill.billDate)] = bill.billAmount;
      let _billDate = moment.utc(bill.billDate).format('YYYY-MM-DD');

      if (moment(_billDate).isSame(now, interval)) {
        // eslint-disable-next-line radix
        sum = sum + parseFloat(bill.billAmount);
        sumBreakDown[interval] = sum;
        return (
          <ListItem icon key={bill.id}>
            <Left>
              <Button
                style={{
                  backgroundColor:
                    expenseCategoryIcons[bill.billCategoryId].color,
                }}>
                <Icon
                  active
                  name={expenseCategoryIcons[bill.billCategoryId].icon}
                />
              </Button>
            </Left>
            <Body>
              <Text>{bill.billName}</Text>
            </Body>
            <Right>
              <Text>${bill.billAmount}</Text>
              <Icon
                active
                name="remove-circle-outline"
                onPress={() => {
                  Alert.alert(
                    'Warning',
                    'Are you sure you want to delete the bill?',
                    [
                      {
                        text: 'Cancel',
                        onPress: () => console.log('Cancel Pressed'),
                        style: 'cancel',
                      },
                      {text: 'OK', onPress: () => deleteBill(bill.id)},
                    ],
                    {cancelable: false},
                  );
                }}
              />
            </Right>
          </ListItem>
        );
      }
    });
  };

  //delete bill
  const deleteBill = async (billId) => {
    const token = await JwtKeyChain.read();
    const circleId = bootstrapState.circles[0].id;
    dispatch(removeBill(billId, circleId, token)).then(
      () => {
        fetchBills();
      },
      (error) => {
        Alert.alert(
          'Error',
          'There was a problem deleting the bill',
          [
            {
              text: 'Ok',
              style: 'cancel',
            },
          ],
          {cancelable: false},
        );
      },
    );
  };

  // ************ BUDGETS ******************//

  //fetch budgets from the DB
  const fetchBudgets = async () => {
    const token = await JwtKeyChain.read();
    const circleId = bootstrapState.circles[0].id;
    dispatch(getBudgets(circleId, token));
  };

  //loads budgets on the screen
  const loadBudgets = () => {
    return expenseManagerState.loadBudgetsResponseDetails.budgets.map(
      (budget) => {
        return (
          <Card key={budget.id}>
            <CardItem>
              <Left>
                <Text>{budget.budgetName}</Text>
              </Left>
              <Body>
                <Text>
                  Start -{' '}
                  {moment.utc(budget.budgetStartDate).format('YYYY-MM-DD')}
                </Text>
                <Text>
                  End - {moment.utc(budget.budgetEndDate).format('YYYY-MM-DD')}
                </Text>
                <Text>
                  Remaining amount is{' '}
                  {calcRemainingBudget(
                    moment.utc(budget.budgetStartDate).format('YYYY-MM-DD'),
                    moment.utc(budget.budgetEndDate).format('YYYY-MM-DD'),
                    budget.budgetAmount,
                    budget.id,
                  )}
                  {budgetRemainingAmount[budget.id]}
                </Text>
              </Body>
              <Right>
                <Text>${budget.budgetAmount}</Text>
                <Icon
                  active
                  name="remove-circle-outline"
                  onPress={() => {
                    Alert.alert(
                      'Warning',
                      'Are you sure you want to delete this budget?',
                      [
                        {
                          text: 'Cancel',
                          onPress: () => console.log('Cancel Pressed'),
                          style: 'cancel',
                        },
                        {text: 'OK', onPress: () => deleteBudget(budget.id)},
                      ],
                      {cancelable: false},
                    );
                  }}
                />
              </Right>
            </CardItem>
          </Card>
        );
      },
    );
  };

  //Iterating over all the bills and checking if they fall under a budget
  let remainingAmount = 0;
  const calcRemainingBudget = (
    budgetStartDate,
    budgetEndDate,
    budgetAmount,
    budgetID,
  ) => {
    let totalSpending = 0;
    remainingAmount = 0;
    for (const date of Object.keys(billAmountByDay)) {
      if (
        moment.utc(date).format('YYYY-MM-DD') <= budgetEndDate &&
        moment.utc(date).format('YYYY-MM-DD') >= budgetStartDate
      ) {
        totalSpending = totalSpending + billAmountByDay[date];
      }
    }
    remainingAmount = budgetAmount - totalSpending;

    budgetRemainingAmount = {
      ...budgetRemainingAmount,
      [budgetID]: remainingAmount.toFixed(2),
    };
    console.log(budgetRemainingAmount);
    //return budgetAmount - totalSpending;
  };

  //delete budget
  const deleteBudget = async (budgetId) => {
    const token = await JwtKeyChain.read();
    const circleId = bootstrapState.circles[0].id;
    dispatch(removeBudget(budgetId, circleId, token)).then(
      () => {
        fetchBudgets();
      },
      (error) => {
        Alert.alert(
          'Error',
          'There was a problem deleting the budget',
          [
            {
              text: 'Ok',
              style: 'cancel',
            },
          ],
          {cancelable: false},
        );
      },
    );
  };

  // ************ OTHERS ***********************//

  //Monitor switching tabs
  const handleChangeTab = (i) => {
    setActiveTab(i);
  };

  // ****************************************************//
  // ************ END OF ACTIONS ***********************//
  // **************************************************//

  // ****************************************************//
  // ************ BEGINING OF EFFECTS ******************//
  // **************************************************//

  //loads bills and budgets
  useEffect(() => {
    fetchBills()
      .then(() => {
        fetchBudgets();
      })
      .catch(() => {
        //tying to fetch budgets anyways
        fetchBudgets();
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //Alert on error - Generic error handler
  useEffect(() => {
    if (expenseManagerState.error) {
      const err = expenseManagerState.error.toString();
      Alert.alert(
        'Error',
        err,
        [
          {
            text: 'Ok',
            style: 'cancel',
          },
        ],
        {cancelable: false},
      );
    }
  }, [expenseManagerState]);

  useEffect(() => {
    console.log(budgetRemainingAmount);
  }, [budgetRemainingAmount]);

  // ****************************************************//
  // ************ End OF EFFECTS ***********************//
  // **************************************************//

  return (
    <Container>
      <Content>
        <Grid>
          <Row size={100}>
            <Tabs onChangeTab={({i}) => handleChangeTab(i)}>
              <Tab heading="Spendings">
                <Tabs>
                  <Tab heading="This Week">
                    {expenseManagerState.loadBillsResponseDetails === '' ? (
                      <Spendings data={<Text>NA</Text>} />
                    ) : (
                      <Spendings
                        data={loadBills('Week')}
                        sum={sumBreakDown.Week}
                      />
                    )}
                  </Tab>
                  <Tab heading="This Month">
                    {expenseManagerState.loadBillsResponseDetails === '' ? (
                      <Spendings data={<Text>NA</Text>} />
                    ) : (
                      <Spendings
                        data={loadBills('Month')}
                        sum={sumBreakDown.Month}
                      />
                    )}
                  </Tab>
                  <Tab heading="This Year">
                    {expenseManagerState.loadBillsResponseDetails === '' ? (
                      <Spendings data={<Text>NA</Text>} />
                    ) : (
                      <Spendings
                        data={loadBills('Year')}
                        sum={sumBreakDown.Year}
                      />
                    )}
                  </Tab>
                </Tabs>
              </Tab>
              <Tab heading="Budget">
                {expenseManagerState.loadBudgetsResponseDetails === '' ? (
                  <Budget data={<Text>NA</Text>} />
                ) : (
                  <Budget data={loadBudgets()} />
                )}
              </Tab>
            </Tabs>
          </Row>
        </Grid>
        <Spendingsmodal
          spendingsModalVisible={spendingsModalVisible}
          closeModal={closeModal}
          fetchBills={fetchBills}
        />
        <BudgetModal
          budgetModalVisible={budgetModalVisible}
          closeModal={closeModal}
          fetchBudgets={fetchBudgets}
        />
      </Content>
      <Fab
        active={true}
        direction="up"
        containerStyle={{}}
        style={expenseManagerStyles.addExpenseButton}
        position="bottomRight"
        onPress={() => {
          activeTab === 0
            ? setSpendingsModalVisible(true)
            : activeTab === 1
            ? setBudgetModalVisible(true)
            : '';
        }}>
        <Icon name="add" useNativeDriver={false} />
      </Fab>
    </Container>
  );
};

export default ExpenseManager;
