/**
 * Expense Manager styles
 *
 * @version 0.0.1
 * @author Arshdeep Singh (https://github.com/Singh-Arshdeep)
 */

import {StyleSheet} from 'react-native';

//Main Styles
const expenseManagerStyles = StyleSheet.create({
  addExpenseButton: {
    backgroundColor: 'red',
  },
});

//spendings modal styles
const modalStyles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 25,
    width: '90%',
    height: '60%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  openButton: {
    backgroundColor: '#F194FF',
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  modalForm: {
    width: '100%',
    height: '100%',
    padding: 5,
  },
  actionButtonsContainer: {
    marginTop: '5%',
  },
  actionButton: {
    marginTop: '2%',
  },
  textFieldError: {
    color: 'red',
    fontSize: 14,
  },
  modalDropDown: {},
  modalDropDownItem: {},
  modalButton: {},
  pickerWidth: {
    width: '100%',
  },
  datePickerTextStyle: {color: 'green'},
  datePickerplaceHolderTextStyle: {color: '#d3d3d3'},
});

export {expenseManagerStyles, modalStyles};
