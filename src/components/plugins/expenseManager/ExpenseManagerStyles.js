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
    alignItems: 'center',
  },
  container: {
    position: 'relative',
    top: 0,
    left: 0,
    padding: 0,
    margin: 0,
    borderTopWidth: 1,
    borderTopColor: '#EBADEB',
  },
  content: {
    position: 'absolute',
    top: -15,
    left: -15,
    right: -15,
    padding: 0,
  },
  addExpenseButton: {
    textAlign: 'center',
  },
  listTop: {
    paddingTop: 18,
    paddingBottom: 18,
    marginLeft: 15,
    marginRight: 15,
    marginBottom: 40,
    borderBottomColor: '#E1E1E1',
    borderBottomWidth: 1,
    backgroundColor: '#FFFFFF',
  },
  listItem: {
    borderBottomColor: '#E1E1E1',
    borderBottomWidth: 1,
    backgroundColor: '#FFFFFF',
  },
  tabStyle: {
    backgroundColor: '#FFFFFF',
    borderBottomColor: '#A53BBA',
    borderBottomWidth: 1,
    height: 55,
  },
  textStyle: {
    fontWeight: 'bold',
    color: '#666',
  },
  activeTabStyle: {
    backgroundColor: '#A53BBA',
    height: 55,
  },
  activeTextStyle: {
    fontWeight: 'bold',
    color: '#FFF',
  },
  tabBarUnderlineStyle: {
    backgroundColor: 'transparent',
  },
  tabStyle2: {
    backgroundColor: '#FFFFFF',
    borderTopColor: '#F1B7FD',
    borderTopWidth: 1,
    borderBottomColor: '#F1B7FD',
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
    color: '#333',
  },
  cardStyle: {
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#E9E9E9',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2.22,
    elevation: 4,
  },
  //Budget
  cardBody: {
    position: 'relative',
  },
  deleteIcon: {
    position: 'absolute',
    top: -5,
    right: -5,
    zIndex: 99,
    opacity: 0.2,
  },
  budget: {
    paddingTop: 10,
    paddingBottom: 16,
    borderBottomColor: '#EEE',
    borderBottomWidth: 1,
  },
  name: {
    fontSize: 20,
    marginLeft: -12,
  },
  amount: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#A53BBA',
    paddingRight: 5,
  },
  remaining: {
    paddingTop: 12,
    paddingLeft: 5,
    paddingBottom: 3,
    fontSize: 16,
  },
  date: {
    color: '#555',
    paddingLeft: 5,
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
    paddingTop: 60,
    width: '95%',
    height: '95%',
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
  addButton: {
    marginTop: '10%',
    backgroundColor: '#A54BBA',
    borderColor: '#A54BBA',
    borderRadius: 3,
  },
  closeButton: {
    marginTop: '5%',
    backgroundColor: '#B5B5B5',
    borderColor: '#B5B5B5',
    borderRadius: 3,
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
  datePickerTextStyle: {color: '#A54BBA'},
  datePickerplaceHolderTextStyle: {color: '#d3d3d3'},
});

//analytic styles
const analyticStyles = StyleSheet.create({
  progressCircle: {
    height: 300,
    marginTop: 50,
  },
});

export {expenseManagerStyles, modalStyles, analyticStyles};
