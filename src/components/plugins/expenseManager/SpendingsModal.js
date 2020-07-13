/**
 * The Modal to add a bill to the list
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
import {addBill, getBillCategories} from '../../../redux';

//native base
import {
  Form,
  Item,
  Input,
  Label,
  Button,
  Text,
  Content,
  Picker,
  DatePicker,
} from 'native-base';

//styles
import {modalStyles} from './ExpenseManagerStyles';

// Token Key Chain
import JwtKeyChain from '../../../utils/jwtKeyChain';

import {spendingsModalValidation} from './spendingsModalValidation';

const Spendingsmodal = (props) => {
  const dispatch = useDispatch();
  const bootstrapState = useSelector((state) => state.bootstrap);
  const expenseManagerState = useSelector((state) => state.expenseManager);
  // ****************************************************//
  // ************ BEGINING OF STATES DECLARATIONS ******//
  // **************************************************//

  const [billDetails, setBillDetails] = useState({
    billName: '',
    billAmount: '',
    billCategory: 1,
    billDate: new Date(),
  });

  const [billDetailsError, setBillDetailsError] = useState({
    billName: {
      error: false,
    },
    billAmount: {
      error: false,
    },
  });

  const [addBillmsg, setAddBillmsg] = useState('');
  const minDate = new Date(2019, 1, 1);
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
    setBillDetails((prevState) => {
      return {
        ...prevState,
        [key]: value,
      };
    });
  };

  /**
   * Add Categories in the dropdown
   */
  const loadCategoryDropDown = () => {
    return expenseManagerState.loadCategoriesResponseDetails.categories.map(
      (category) => {
        return (
          <Picker.Item
            label={category.categoryName.toString()}
            value={category.id}
            key={category.id}
          />
        );
      },
    );
  };

  /**
   * Adds the bill to list
   */
  const handleAddBill = async () => {
    setAddBillmsg('');
    resetErrorState()
      .then(() => {
        let spendingsModalValidationErrors = spendingsModalValidation(
          billDetails,
        );
        spendingsModalValidationErrors.then(async (errors) => {
          setBillDetailsError(errors);
          if (!errors.billName.error && !errors.billAmount.error) {
            const token = await JwtKeyChain.read();
            const circleId = bootstrapState.circles[0].id;
            const _billDetails = billDetails;
            dispatch(addBill(_billDetails, circleId, token)).then(() => {
              props.fetchBills();
            });
            resetBillState();
            resetErrorState();
            setAddBillmsg('...processing');
          }
        });
      })
      .catch(() => {
        console.log('Caught an error.');
      });
  };

  const resetBillState = async () => {
    setBillDetails({
      billName: '',
      billAmount: '',
      billCategory: '1',
      billDate: new Date(),
    });
  };

  const resetErrorState = async () => {
    setBillDetailsError({
      billName: {
        error: false,
      },
      billAmount: {
        error: false,
      },
    });
  };

  const closeModal = () => {
    setAddBillmsg('');
    resetBillState();
    resetErrorState();
    props.closeModal();
  };

  // ****************************************************//
  // ************ End of Actions ***********************//
  // **************************************************//

  // ****************************************************//
  // ************ BEGINING OF EFFECTS ******************//
  // **************************************************//

  //loads bill categories onload
  useEffect(() => {
    const fetchCategories = async () => {
      const token = await JwtKeyChain.read();
      dispatch(getBillCategories(token));
    };
    fetchCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (expenseManagerState.error) {
      console.log(expenseManagerState.error.toString());
    } else if (expenseManagerState.addBillResponseDetails === 200) {
      setAddBillmsg('Done');
      setTimeout(() => {
        setAddBillmsg('');
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
        visible={props.spendingsModalVisible}
        onDismiss={() => {
          Alert.alert('Modal has been closed.');
        }}>
        <View style={modalStyles.centeredView}>
          <View style={modalStyles.modalView}>
            <Form style={modalStyles.modalForm}>
              <Item stackedLabel>
                <Label>Bill Name*</Label>
                <Input
                  onChangeText={(val) =>
                    handleModalFormInputChange('billName', val)
                  }
                />
              </Item>
              <Item stackedLabel>
                <Label>Bill Amount in CAD*</Label>
                <Input
                  keyboardType="numeric"
                  onChangeText={(val) =>
                    handleModalFormInputChange('billAmount', val)
                  }
                />
              </Item>
              <Item stackedLabel style={modalStyles.modalDropDownItem}>
                <Label>Select a category*</Label>
                <Picker
                  note
                  mode="dropdown"
                  style={modalStyles.pickerWidth}
                  selectedValue={billDetails.billCategory}
                  onValueChange={(value) => {
                    handleModalFormInputChange('billCategory', value);
                  }}>
                  {expenseManagerState.loadCategoriesResponseDetails === '' ? (
                    <Picker.Item label="loading" value={0} key={0} />
                  ) : (
                    loadCategoryDropDown()
                  )}
                </Picker>
              </Item>
              <Item stackedLabel>
                <Label>Bill Date:</Label>
                <DatePicker
                  defaultDate={billDetails.billDate}
                  minimumDate={minDate}
                  maximumDate={billDetails.billDate}
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
                    handleModalFormInputChange('billDate', value);
                  }}
                  disabled={false}
                />
              </Item>
              <Content style={modalStyles.actionButtonsContainer}>
                <Button
                  onPress={handleAddBill}
                  bordered
                  block
                  success
                  style={modalStyles.addButton}>
                  <Text style={{color:'white'}}>Add</Text>
                </Button>
                <Button
                  onPress={closeModal}
                  bordered
                  block
                  warning
                  style={modalStyles.closeButton}>
                  <Text style={{color:'white'}}>Close</Text>
                </Button>
                {billDetailsError.billName.error && (
                  <Label style={modalStyles.textFieldError}>
                    {billDetailsError.billName.message}
                  </Label>
                )}
                {billDetailsError.billAmount.error && (
                  <Label style={modalStyles.textFieldError}>
                    {billDetailsError.billAmount.message}
                  </Label>
                )}
                {expenseManagerState.loading ? (
                  <Label>...</Label>
                ) : (
                  <Label>{addBillmsg}</Label>
                )}
              </Content>
            </Form>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Spendingsmodal;
