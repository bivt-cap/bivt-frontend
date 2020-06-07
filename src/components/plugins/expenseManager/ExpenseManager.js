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
import {getBills} from '../../../redux';

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
  const [active, setActive] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  // ****************************************************//
  // ************ END OF STATES DECLARATIONS ***********//
  // **************************************************//

  // ****************************************************//
  // ************ BEGINING OF ACTIONS ******************//
  // **************************************************//
  //Closes the modal
  const closeModal = () => {
    setModalVisible(false);
  };

  const loadBills = (interval) => {
    const now = moment();
    return expenseManagerState.loadBillsResponseDetails.bills.map((bill) => {
      if (moment(bill.billDate).isSame(now, interval)) {
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
              <Icon active name="remove" />
            </Right>
          </ListItem>
        );
      }
    });
  };
  const fetchBills = async () => {
    const token = await JwtKeyChain.read();
    const circleId = bootstrapState.circles[0].id;
    dispatch(getBills(circleId, token));
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
    console.log(expenseManagerState);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // ****************************************************//
  // ************ End OF EFFECTS ***********************//
  // **************************************************//

  return (
    <Container>
      <Content>
        <Grid>
          <Row size={100}>
            <Tabs>
              <Tab heading="Spendings">
                <Tabs>
                  <Tab heading="This Week">
                    {expenseManagerState.loadBillsResponseDetails === '' ? (
                      <Spendings data={<Text>NA</Text>} />
                    ) : (
                      <Spendings data={loadBills('Week')} />
                    )}
                  </Tab>
                  <Tab heading="This Month">
                    {expenseManagerState.loadBillsResponseDetails === '' ? (
                      <Spendings data="NA" />
                    ) : (
                      <Spendings data={loadBills('Month')} />
                    )}
                  </Tab>
                  <Tab heading="This Year">
                    {expenseManagerState.loadBillsResponseDetails === '' ? (
                      <Spendings data="NA" />
                    ) : (
                      <Spendings data={loadBills('Year')} />
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
          modalVisible={modalVisible}
          closeModal={closeModal}
          fetchBills={fetchBills}
        />
      </Content>
      <Fab
        active={true}
        direction="up"
        containerStyle={{}}
        style={expenseManagerStyles.selectPluginButton}
        position="bottomRight"
        onPress={() => {
          setModalVisible(true);
        }}>
        <Icon name="add" useNativeDriver={false} />
      </Fab>
    </Container>
  );
};

export default ExpenseManager;
