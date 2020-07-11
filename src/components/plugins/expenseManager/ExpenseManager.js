/**
 * Expense Manager plugin
 *
 * @version 0.0.1
 * @author Arshdeep Singh (https://github.com/Singh-Arshdeep)
 */
//react
import React, {useState, useEffect} from 'react';
import { TouchableOpacity } from 'react-native';

//react native
import {Text, Alert} from 'react-native';

//redux
import {useSelector, useDispatch} from 'react-redux';
import {getBills, removeBill, getBudgets, removeBudget} from '../../../redux';
import { Svg, Path, G, Rect, Text as Svgtext } from 'react-native-svg'

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
  View
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
            <Left style={expenseManagerStyles.listItem}>
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
                    moment(budget.budgetStartDate).format('YYYY-MM-DD'),
                    moment(budget.budgetEndDate).format('YYYY-MM-DD'),
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
        moment(date).format('YYYY-MM-DD') <= budgetEndDate &&
        moment(date).format('YYYY-MM-DD') >= budgetStartDate
      ) {
        totalSpending = totalSpending + billAmountByDay[date];
      }
    }
    remainingAmount = budgetAmount - totalSpending;

    budgetRemainingAmount = {
      ...budgetRemainingAmount,
      [budgetID]: remainingAmount.toFixed(2),
    };
    //console.log(budgetRemainingAmount);
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
    <>
    <Container> 
      <Content>
        <Grid>
          <Row size={100}>

            <Tabs 
              onChangeTab={({i}) => handleChangeTab(i)} 
              tabBarUnderlineStyle={expenseManagerStyles.tabBarUnderlineStyle}
            >
              <Tab 
                heading="Spendings" 
                tabStyle={expenseManagerStyles.tabStyle} 
                textStyle={expenseManagerStyles.textStyle} 
                activeTabStyle={expenseManagerStyles.activeTabStyle}
                activeTextStyle={expenseManagerStyles.activeTextStyle} 
              >
                <Tabs tabBarUnderlineStyle={expenseManagerStyles.tabBarUnderlineStyle}>
                  <Tab 
                    heading="This Week" 
                    tabStyle={expenseManagerStyles.tabStyle2} 
                    textStyle={expenseManagerStyles.textStyle2} 
                    activeTabStyle={expenseManagerStyles.activeTabStyle2}
                    activeTextStyle={expenseManagerStyles.activeTextStyle2} 
                  >
                    {expenseManagerState.loadBillsResponseDetails === '' ? (
                      <Spendings data={<Text>NA</Text>} />
                    ) : (
                      <Spendings
                        data={loadBills('Week')}
                        sum={sumBreakDown.Week}
                      />
                    )}
                  </Tab>
                  <Tab 
                    heading="This Month"
                    tabStyle={expenseManagerStyles.tabStyle2} 
                    textStyle={expenseManagerStyles.textStyle2} 
                    activeTabStyle={expenseManagerStyles.activeTabStyle2}
                    activeTextStyle={expenseManagerStyles.activeTextStyle2} 
                  >
                    {expenseManagerState.loadBillsResponseDetails === '' ? (
                      <Spendings data={<Text>NA</Text>} />
                    ) : (
                      <Spendings
                        data={loadBills('Month')}
                        sum={sumBreakDown.Month}
                      />
                    )}
                  </Tab>
                  <Tab 
                    heading="This Year"
                    tabStyle={expenseManagerStyles.tabStyle2} 
                    textStyle={expenseManagerStyles.textStyle2} 
                    activeTabStyle={expenseManagerStyles.activeTabStyle2}
                    activeTextStyle={expenseManagerStyles.activeTextStyle2} 
                  >
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
              <Tab 
                heading="Budget"
                tabStyle={expenseManagerStyles.tabStyle} 
                textStyle={expenseManagerStyles.textStyle} 
                activeTabStyle={expenseManagerStyles.activeTabStyle}
                activeTextStyle={expenseManagerStyles.activeTextStyle} 
                tabBarBackgroundColor="red"
              >
                {expenseManagerState.loadBudgetsResponseDetails === '' ? (
                  <Budget data={<Text>NA</Text>} />
                ) : (
                  <Budget data={loadBudgets()}/>
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
    </Container>

    <View style={expenseManagerStyles.addExpenseButtonWrap}>
      <TouchableOpacity
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
          {/* <Icon name="add" useNativeDriver={false} /> */}
            <Svg xmlns="http://www.w3.org/2000/svg" width="51.293" height="59.5" viewBox="0 0 51.293 59.5">
              <G id="Group_1529" data-name="Group 1529" transform="translate(-164 -5075)">
                  <G id="Polygon_2" data-name="Polygon 2" transform="translate(215.293 5075) rotate(90)" fill="#a53bba">
                      <Path d="M 42.89691925048828 50.2931022644043 L 16.60308074951172 50.2931022644043 C 15.89247035980225 50.2931022644043 15.2295503616333 49.91123962402344 14.87302017211914 49.29653930664062 L 1.738019943237305 26.64998054504395 C 1.379040002822876 26.03104019165039 1.379040002822876 25.26205062866211 1.738019943237305 24.64310073852539 L 14.87302017211914 1.996561169624329 C 15.2295503616333 1.381861090660095 15.89247989654541 1.000001072883606 16.60309028625488 1.000001072883606 L 42.89691925048828 1.000001072883606 C 43.60752868652344 1.000001072883606 44.27045059204102 1.381861090660095 44.62697982788086 1.996571183204651 L 57.76198959350586 24.64312171936035 C 58.1209716796875 25.26206207275391 58.1209716796875 26.03104019165039 57.76198959350586 26.64998054504395 L 44.62697982788086 49.29653930664062 C 44.27045059204102 49.91123962402344 43.60752868652344 50.2931022644043 42.89691925048828 50.2931022644043 Z" stroke="none"/>
                      <Path d="M 16.60308837890625 2 C 16.24777984619141 2 15.91630935668945 2.190929412841797 15.7380485534668 2.498279571533203 L 2.603050231933594 25.14483070373535 C 2.423561096191406 25.45430183410645 2.423561096191406 25.83879089355469 2.603050231933594 26.14826202392578 L 15.73805999755859 48.79482269287109 C 15.91632080078125 49.1021728515625 16.24777984619141 49.2931022644043 16.60308074951172 49.2931022644043 L 42.89691162109375 49.2931022644043 C 43.25222015380859 49.2931022644043 43.58367919921875 49.1021614074707 43.76194763183594 48.7948112487793 L 56.89694976806641 26.14826202392578 C 57.07643890380859 25.83880043029785 57.07643890380859 25.45430183410645 56.89694976806641 25.14484024047852 L 43.76195907592773 2.498291015625 C 43.58369064331055 2.190929412841797 43.25222015380859 2 42.89691162109375 2 L 16.60308837890625 2 M 16.60308837890625 0 L 42.89691162109375 0 C 43.96659088134766 0 44.95532989501953 0.569549560546875 45.49201202392578 1.494842529296875 L 58.62701034545898 24.14140129089355 C 59.1668815612793 25.07221031188965 59.1668815612793 26.22089195251465 58.62701034545898 27.15170097351074 L 45.49201202392578 49.79825210571289 C 44.95532989501953 50.72355270385742 43.96659088134766 51.2931022644043 42.89691162109375 51.2931022644043 L 16.60308074951172 51.2931022644043 C 15.53340911865234 51.2931022644043 14.54465866088867 50.72355270385742 14.00799179077148 49.79825210571289 L 0.8729896545410156 27.15170097351074 C 0.3331108093261719 26.22088050842285 0.3331108093261719 25.07221031188965 0.8729896545410156 24.14139175415039 L 14.00799179077148 1.494842529296875 C 14.54467010498047 0.569549560546875 15.53342056274414 0 16.60308837890625 0 Z" stroke="none" fill="#a53bba"/>
                  </G>
                  <G id="Group_1528" data-name="Group 1528" transform="translate(-421.5 79)">
                  <G id="Rectangle_234" data-name="Rectangle 234" transform="translate(610 5017)" fill="#fff" stroke="#fff" stroke-width="1">
                      <Rect width="2" height="17" rx="1" stroke="none"/>
                      <Rect x="0.5" y="0.5" width="1" height="16" rx="0.5" fill="none"/>
                  </G>
                  <G id="Rectangle_235" data-name="Rectangle 235" transform="translate(619.5 5024.5) rotate(90)" fill="#fff" stroke="#fff" stroke-width="1">
                      <Rect width="2" height="17" rx="1" stroke="none"/>
                      <Rect x="0.5" y="0.5" width="1" height="16" rx="0.5" fill="none"/>
                  </G>
                  </G>
              </G>
            </Svg>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default ExpenseManager;
