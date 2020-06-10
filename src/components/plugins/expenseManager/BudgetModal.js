/**
 * The Modal to add a budget
 *
 * @version 0.0.1
 * @author Arshdeep Singh (https://github.com/Singh-Arshdeep)
 */
//react
import React, {useState, useEffect} from 'react';

//react native
import {Modal, View, Alert} from 'react-native';

//redux
import {useSelector, useDispatch} from 'react-redux';
import {addBudget} from '../../../redux';

//native base
import {
  Form,
  Item,
  Input,
  Label,
  Button,
  Text,
  Content,
  DatePicker,
} from 'native-base';

//etc
import moment from 'moment';

//styles
import {modalStyles} from './expenseManagerStyles';

// Token Key Chain
import JwtKeyChain from '../../../utils/jwtKeyChain';

import {budgetModalValidation} from './budgetModalValidation';

const Budgetmodal = (props) => {
  const dispatch = useDispatch();
  const bootstrapState = useSelector((state) => state.bootstrap);
  const expenseManagerState = useSelector((state) => state.expenseManager);
  // ****************************************************//
  // ************ BEGINING OF STATES DECLARATIONS ******//
  // **************************************************//

  const [budgetDetails, setBudgetDetails] = useState({
    budgetName: '',
    budgetAmount: '',
    budgetFrom: moment().toDate(),
    budgetTo: moment().add(1, 'months').toDate(), //adds one month
  });

  const [budgetDetailsError, setBudgetDetailsError] = useState({
    budgetName: {
      error: false,
    },
    budgetAmount: {
      error: false,
    },
    budgetDate: {
      error: false,
    },
  });

  const [addBudgetmsg, setAddBudgetmsg] = useState('');
  const maxDate = moment().add(1, 'years').toDate(); //adds one year
  // ****************************************************//
  // ************ END OF STATES DECLARATIONS ***********//
  // **************************************************//

  // ****************************************************//
  // ************ BEGINING OF Actions ******************//
  // **************************************************//

  /**
   * @param key - type of input
   * @param value - entered value
   */
  const handleModalFormInputChange = (key, value) => {
    setBudgetDetails((prevState) => {
      return {
        ...prevState,
        [key]: value,
      };
    });
  };

  /**
   * Adds the budget to list
   */
  const handleAddBudget = async () => {
    setAddBudgetmsg('');
    resetErrorState()
      .then(() => {
        let budgetModalValidationErrors = budgetModalValidation(budgetDetails);
        budgetModalValidationErrors.then(async (errors) => {
          setBudgetDetailsError(errors);
          if (!errors.budgetName.error && !errors.budgetAmount.error) {
            const token = await JwtKeyChain.read();
            const circleId = bootstrapState.circles[0].id;
            const _budgetDetails = budgetDetails;
            // dispatch(addBudget(_budgetDetails, circleId, token)).then(() => {
            //   props.fetchBudgets();
            // });
            resetBudgetState();
            resetErrorState();
            setAddBudgetmsg('...processing');
          }
        });
      })
      .catch(() => {
        console.log('Caught an error.');
      });
  };

  const resetBudgetState = async () => {
    setBudgetDetails({
      budgetName: '',
      budgetAmount: '',
      budgetFrom: moment().toDate(),
      budgetTo: moment().add(1, 'months').toDate(), //adds one month
    });
  };

  const resetErrorState = async () => {
    setBudgetDetailsError({
      budgetName: {
        error: false,
      },
      budgetAmount: {
        error: false,
      },
      budgetDate: {
        error: false,
      },
    });
  };

  const closeModal = () => {
    setAddBudgetmsg('');
    resetBudgetState();
    resetErrorState();
    props.closeModal();
  };

  // ****************************************************//
  // ************ End of Actions ***********************//
  // **************************************************//

  // ****************************************************//
  // ************ BEGINING OF EFFECTS ******************//
  // **************************************************//

  useEffect(() => {
    if (expenseManagerState.error) {
      console.log(expenseManagerState.error.toString());
    } else if (expenseManagerState.addBudgetResponseDetails === 200) {
      setAddBudgetmsg('Done');
      setTimeout(() => {
        setAddBudgetmsg('');
      }, 1000);
      closeModal();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [expenseManagerState]);

  // ****************************************************//
  // ************ End OF EFFECTS ***********************//
  // **************************************************//

  return (
    <View style={modalStyles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={props.budgetModalVisible}
        onDismiss={() => {
          Alert.alert('Modal has been closed.');
        }}>
        <View style={modalStyles.centeredView}>
          <View style={modalStyles.modalView}>
            <Form style={modalStyles.modalForm}>
              <Item stackedLabel>
                <Label>Budget Name*</Label>
                <Input
                  onChangeText={(val) =>
                    handleModalFormInputChange('budgetName', val)
                  }
                />
              </Item>
              <Item stackedLabel>
                <Label>Budget Amount in CAD*</Label>
                <Input
                  keyboardType="numeric"
                  onChangeText={(val) =>
                    handleModalFormInputChange('budgetAmount', val)
                  }
                />
              </Item>
              <Item stackedLabel>
                <Label>Budget From:</Label>
                <DatePicker
                  defaultDate={budgetDetails.budgetFrom}
                  minimumDate={budgetDetails.budgetFrom}
                  maximumDate={maxDate}
                  locale={'en'}
                  timeZoneOffsetInMinutes={undefined}
                  modalTransparent={false}
                  animationType={'fade'}
                  androidMode={'default'}
                  // placeHolderText="Select date"
                  textStyle={modalStyles.datePickerTextStyle}
                  placeHolderTextStyle={
                    modalStyles.datePickerplaceHolderTextStyle
                  }
                  onDateChange={(value) => {
                    handleModalFormInputChange('budgetFrom', value);
                  }}
                  disabled={false}
                />
              </Item>
              <Item stackedLabel>
                <Label>Budget To:</Label>
                <DatePicker
                  defaultDate={budgetDetails.budgetTo}
                  minimumDate={budgetDetails.budgetFrom}
                  maximumDate={maxDate}
                  locale={'en'}
                  timeZoneOffsetInMinutes={undefined}
                  modalTransparent={false}
                  animationType={'fade'}
                  androidMode={'default'}
                  // placeHolderText="Select date"
                  textStyle={modalStyles.datePickerTextStyle}
                  placeHolderTextStyle={
                    modalStyles.datePickerplaceHolderTextStyle
                  }
                  onDateChange={(value) => {
                    handleModalFormInputChange('budgetTo', value);
                  }}
                  disabled={false}
                />
              </Item>
              <Content style={modalStyles.actionButtonsContainer}>
                <Button
                  onPress={handleAddBudget}
                  bordered
                  block
                  success
                  style={modalStyles.actionButton}>
                  <Text>Add</Text>
                </Button>
                <Button
                  onPress={closeModal}
                  bordered
                  block
                  warning
                  style={modalStyles.actionButton}>
                  <Text>Close</Text>
                </Button>
                {budgetDetailsError.budgetName.error && (
                  <Label style={modalStyles.textFieldError}>
                    {budgetDetailsError.budgetName.message}
                  </Label>
                )}
                {budgetDetailsError.budgetAmount.error && (
                  <Label style={modalStyles.textFieldError}>
                    {budgetDetailsError.budgetAmount.message}
                  </Label>
                )}
                {budgetDetailsError.budgetDate.error && (
                  <Label style={modalStyles.textFieldError}>
                    {budgetDetailsError.budgetDate.message}
                  </Label>
                )}
                {expenseManagerState.loading ? (
                  <Label>...</Label>
                ) : (
                  <Label>{addBudgetmsg}</Label>
                )}
              </Content>
            </Form>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Budgetmodal;
