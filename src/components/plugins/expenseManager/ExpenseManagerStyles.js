/**
 * Expense Manager styles
 *
 * @version 0.0.1
 * @author Arshdeep Singh (https://github.com/Singh-Arshdeep)
 */

import {StyleSheet} from 'react-native';

//Main Styles
const expenseManagerStyles = StyleSheet.create({
  addExpenseButtonWrap: {
    width: '100%',
    position: 'absolute',
    left: 0,
    bottom: 30,
    justifyContent: 'center',
    alignItems: 'center'
  },
  addExpenseButton: {
    textAlign:'center'
  },
  listTop: {
    paddingTop: 18,
    paddingBottom: 18,
    marginBottom: 40,
    borderBottomColor:'#E1E1E1',
    borderBottomWidth: 1,
    backgroundColor: '#FFFFFF',
  },
  listItem: {
    borderBottomColor:'#E1E1E1',
    borderBottomWidth: 1,
    backgroundColor: '#FFFFFF',
  },
  tabStyle: {
    backgroundColor: '#FFFFFF',
    borderTopColor:'#A53BBA',
    borderTopWidth: 1,
    borderBottomColor:'#A53BBA',
    borderBottomWidth: 1,
    height: 55,
  },
  textStyle: {
    fontWeight:'bold',
    color: '#666',
  },
  activeTabStyle: {
    backgroundColor: '#A53BBA',
    height: 55,
  },
  activeTextStyle: {
    fontWeight:'bold',
    color: '#FFF'
  },
  tabBarUnderlineStyle: {
    backgroundColor:'transparent'
  },
  tabStyle2: {
    backgroundColor: '#FFFFFF',
    borderTopColor:'#F1B7FD',
    borderTopWidth: 1,
    borderBottomColor:'#F1B7FD',
    borderBottomWidth: 1,
  },
  textStyle2: {
    color: '#666',
  },
  activeTabStyle2: {
    backgroundColor: '#F1B7FD',
    borderTopColor: '#F1B7FD',
  },
  activeTextStyle2: {
    color: '#333'
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
    height: '90%',
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
    marginBottom: 16,
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
