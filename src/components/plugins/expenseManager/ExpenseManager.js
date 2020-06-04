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

//native base
import {Container, Tabs, Tab, Icon, Content, Fab, Toast} from 'native-base';
import {Row, Grid} from 'react-native-easy-grid';

//styles
import {expenseManagerStyles} from './expenseManagerStyles';

//Components
import Spendingsmodal from './SpendingsModal';
import Spendings from './Spendings';

const ExpenseManager = () => {
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
  // ****************************************************//
  // ************ END OF ACTIONS ***********************//
  // **************************************************//

  // ****************************************************//
  // ************ BEGINING OF EFFECTS ******************//
  // **************************************************//

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
                  <Tab heading="Today">
                    <Spendings style={{flexGrow: 1}} />
                  </Tab>
                  <Tab heading="This Week">
                    <Text>This Week</Text>
                  </Tab>
                  <Tab heading="This Month">
                    <Text>This Month</Text>
                  </Tab>
                  <Tab heading="This Year">
                    <Text>This Year</Text>
                  </Tab>
                </Tabs>
              </Tab>
              <Tab heading="Budget"></Tab>
            </Tabs>
          </Row>
        </Grid>
        <Spendingsmodal modalVisible={modalVisible} closeModal={closeModal} />
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
