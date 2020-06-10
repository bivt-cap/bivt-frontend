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
import {getBills, removeBill} from '../../../redux';

//native base
import {
  Container,
  Tabs,
  Tab,
  Icon,
  Content,
  Fab,
  ListItem,
  Left,
  Body,
  Right,
  Button,
} from 'native-base';
import {Row, Grid} from 'react-native-easy-grid';

//etc
import moment from 'moment';

//styles
import {expenseManagerStyles} from './expenseManagerStyles';

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
  let sumBreakDown = {};
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

  //fetch bills from the DB
  const fetchBills = async () => {
    const token = await JwtKeyChain.read();
    const circleId = bootstrapState.circles[0].id;
    dispatch(getBills(circleId, token));
  };

  //loads bills on the screen
  const loadBills = (interval) => {
    const now = moment();
    let sum = 0;
    return expenseManagerState.loadBillsResponseDetails.bills.map((bill) => {
      if (moment(bill.billDate).isSame(now, interval)) {
        // eslint-disable-next-line radix
        sum = sum + parseInt(bill.billAmount);
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

  //loads bils
  useEffect(() => {
    fetchBills();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //Alert on error
  useEffect(() => {
    if (expenseManagerState.error) {
      Alert.alert(
        'Error',
        ...expenseManagerState.error,
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
                <Text>NA</Text>
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
