/**
 * Expense Manager reducer
 *
 * @version 0.0.1
 * @author Arshdeep Singh (https://github.com/Singh-Arshdeep)
 */

import {
  EXPENSE_MANAGER_REQUEST,
  EXPENSE_MANAGER_LOAD_BILLS_SUCCESS,
  EXPENSE_MANAGER_ADD_BILL_SUCCESS,
  EXPENSE_MANAGER_FAILURE,
} from './expenseManagerTypes';

const choosePluginInitialState = {
  loading: false,
  loadBillsResponseDetails: '',
  addBillResponseDetails: '',
  error: '',
};

let expenseManagerReducer = (state = choosePluginInitialState, action) => {
  switch (action.type) {
    case EXPENSE_MANAGER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case EXPENSE_MANAGER_LOAD_BILLS_SUCCESS:
      return {
        ...state,
        loading: false,
        loadBillsResponseDetails: action.payload,
        error: '',
      };
    case EXPENSE_MANAGER_ADD_BILL_SUCCESS:
      return {
        ...state,
        loading: false,
        addBillResponseDetails: action.payload,
        error: '',
      };
    case EXPENSE_MANAGER_FAILURE:
      return {
        loading: false,
        loadBillsResponseDetails: '',
        addBillResponseDetails: '',
        error: action.payload,
      };
    default:
      return state;
  }
};

export default expenseManagerReducer;
