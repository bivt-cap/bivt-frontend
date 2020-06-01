/**
 * The Modal to add a bill to the list
 *
 * @version 0.0.1
 * @author Arshdeep Singh (https://github.com/Singh-Arshdeep)
 */
//react
import React, {useState, useEffect} from 'react';

//react native
import {Modal, View} from 'react-native';

//redux
import {useSelector, useDispatch} from 'react-redux';
import {addBill} from '../../../redux';

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
import {SpendingsmodalStyles} from './expenseManagerStyles';

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
    billCategory: 'Food',
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
   * Adds the bill to list
   */
  const handleAddBill = async () => {
    let spendingsModalValidationErrors = spendingsModalValidation(billDetails);
    spendingsModalValidationErrors.then(async (errors) => {
      setBillDetailsError(errors);
      if (!errors.billName.error && !errors.billAmount.error) {
        const token = await JwtKeyChain.read();
        const circleId = bootstrapState.circles[0].id;
        dispatch(addBill(billDetails, circleId, token));
      }
    });
  };

  // ****************************************************//
  // ************ End of Actions ***********************//
  // **************************************************//

  // ****************************************************//
  // ************ BEGINING OF EFFECTS ******************//
  // **************************************************//
  useEffect(() => {
    setBillDetails({
      billName: '',
      billAmount: '',
      billCategory: 'Food',
      billDate: new Date(),
    });
    setBillDetailsError({
      billName: {
        error: false,
      },
      billAmount: {
        error: false,
      },
    });
  }, [expenseManagerState.addBillResponseDetails]);
  // ****************************************************//
  // ************ End OF EFFECTS ***********************//
  // **************************************************//

  return (
    <View style={SpendingsmodalStyles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={props.modalVisible}
        onRequestClose={() => {}}>
        <View style={SpendingsmodalStyles.centeredView}>
          <View style={SpendingsmodalStyles.modalView}>
            <Form style={SpendingsmodalStyles.modalForm}>
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
              <Item stackedLabel style={SpendingsmodalStyles.modalDropDownItem}>
                <Label>Select a category*</Label>
                <Picker
                  note
                  mode="dropdown"
                  style={{width: '100%'}}
                  selectedValue={billDetails.billCategory}
                  onValueChange={(value) => {
                    handleModalFormInputChange('billCategory', value);
                  }}>
                  <Picker.Item label="Food" value="Food" />
                  <Picker.Item label="Home" value="Home" />
                  <Picker.Item label="Bills" value="Bills" />
                  <Picker.Item label="Repairs" value="Repairs" />
                  <Picker.Item label="Vehicle" value="Vehicle" />
                  <Picker.Item label="Others" value="Others" />
                </Picker>
              </Item>
              <Item stackedLabel>
                <Label>Bill Date:</Label>
                <DatePicker
                  defaultDate={billDetails.billDate}
                  minimumDate={new Date(2019, 1, 1)}
                  maximumDate={billDetails.billDate}
                  locale={'en'}
                  timeZoneOffsetInMinutes={undefined}
                  modalTransparent={false}
                  animationType={'fade'}
                  androidMode={'default'}
                  // placeHolderText="Select date"
                  textStyle={{color: 'green'}}
                  placeHolderTextStyle={{color: '#d3d3d3'}}
                  onDateChange={(value) => {
                    handleModalFormInputChange('billDate', value);
                  }}
                  disabled={false}
                />
              </Item>
              <Content style={SpendingsmodalStyles.actionButtonsContainer}>
                <Button
                  onPress={handleAddBill}
                  bordered
                  block
                  success
                  style={SpendingsmodalStyles.actionButton}>
                  <Text>Add</Text>
                </Button>
                <Button
                  onPress={props.closeModal}
                  bordered
                  block
                  warning
                  style={SpendingsmodalStyles.actionButton}>
                  <Text>Close</Text>
                </Button>
                {billDetailsError.billName.error && (
                  <Label style={SpendingsmodalStyles.textFieldError}>
                    {billDetailsError.billName.message}
                  </Label>
                )}
                {billDetailsError.billAmount.error && (
                  <Label style={SpendingsmodalStyles.textFieldError}>
                    {billDetailsError.billAmount.message}
                  </Label>
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
