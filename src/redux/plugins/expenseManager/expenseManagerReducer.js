/**
 * Expense Manager reducer
 *
 * @version 0.0.1
 * @author Arshdeep Singh (https://github.com/Singh-Arshdeep)
 */

import {
  EXPENSE_MANAGER_REQUEST,
  EXPENSE_MANAGER_LOAD_CATEGORIES_SUCCESS,
  EXPENSE_MANAGER_LOAD_CATEGORIES_FAILURE,
  EXPENSE_MANAGER_LOAD_BILLS_SUCCESS,
  EXPENSE_MANAGER_LOAD_BILLS_FAILURE,
  EXPENSE_MANAGER_ADD_BILL_SUCCESS,
  EXPENSE_MANAGER_ADD_BILL_FAILURE,
  EXPENSE_MANAGER_FAILURE,
} from './expenseManagerTypes';

const choosePluginInitialState = {
  loading: false,
  loadCategoriesResponseDetails: '',
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
    case EXPENSE_MANAGER_LOAD_CATEGORIES_SUCCESS:
      return {
        ...state,
        loading: false,
        loadCategoriesResponseDetails: action.payload,
        error: '',
      };
    case EXPENSE_MANAGER_LOAD_CATEGORIES_FAILURE:
      return {
        ...state,
        loading: false,
        loadCategoriesResponseDetails: '',
        error: action.payload,
      };
    case EXPENSE_MANAGER_LOAD_BILLS_SUCCESS:
      return {
        ...state,
        loading: false,
        loadBillsResponseDetails: action.payload,
        error: '',
      };
    case EXPENSE_MANAGER_LOAD_BILLS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case EXPENSE_MANAGER_ADD_BILL_SUCCESS:
      return {
        ...state,
        loading: false,
        addBillResponseDetails: action.payload,
        error: '',
      };
    case EXPENSE_MANAGER_ADD_BILL_FAILURE:
      return {
        ...state,
        loading: false,
        addBillResponseDetails: '',
        error: action.payload,
      };
    case EXPENSE_MANAGER_FAILURE:
      return {
        loading: false,
        loadCategoriesResponseDetails: '',
        loadBillsResponseDetails: '',
        addBillResponseDetails: '',
        error: action.payload,
      };
    default:
      return state;
  }
};

export default expenseManagerReducer;
