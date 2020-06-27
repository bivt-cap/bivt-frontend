/**
 * Expense Manager reducer
 *
 * @version 0.0.1
 * @author Arshdeep Singh (https://github.com/Singh-Arshdeep)
 * This code should be refactored to handle errors in a better way - arsh
 */

import {
  EXPENSE_MANAGER_REQUEST,
  EXPENSE_MANAGER_LOAD_CATEGORIES_SUCCESS,
  EXPENSE_MANAGER_LOAD_CATEGORIES_FAILURE,
  EXPENSE_MANAGER_LOAD_BILLS_SUCCESS,
  EXPENSE_MANAGER_LOAD_BILLS_FAILURE,
  EXPENSE_MANAGER_ADD_BILL_SUCCESS,
  EXPENSE_MANAGER_ADD_BILL_FAILURE,
  EXPENSE_MANAGER_REMOVE_BILL_SUCCESS,
  EXPENSE_MANAGER_REMOVE_BILL_FAILURE,
  EXPENSE_MANAGER_ADD_BUDGET_SUCCESS,
  EXPENSE_MANAGER_ADD_BUDGET_FAILURE,
  EXPENSE_MANAGER_LOAD_BUDGETS_SUCCESS,
  EXPENSE_MANAGER_LOAD_BUDGETS_FAILURE,
  EXPENSE_MANAGER_REMOVE_BUDGET_SUCCESS,
  EXPENSE_MANAGER_REMOVE_BUDGET_FAILURE,
  EXPENSE_MANAGER_FAILURE,
} from './expenseManagerTypes';

const choosePluginInitialState = {
  loading: false,
  loadCategoriesResponseDetails: '',
  loadBillsResponseDetails: '',
  addBillResponseDetails: '',
  removeBillResponseDetails: '',
  addBudgetResponseDetails: '',
  loadBudgetsResponseDetails: '',
  removeBudgetResponseDetails: '',
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
    case EXPENSE_MANAGER_REMOVE_BILL_SUCCESS:
      return {
        ...state,
        loading: false,
        removeBillResponseDetails: action.payload,
        error: '',
      };
    case EXPENSE_MANAGER_REMOVE_BILL_FAILURE:
      return {
        ...state,
        loading: false,
        removeBillResponseDetails: '',
        error: action.payload,
      };
    case EXPENSE_MANAGER_ADD_BUDGET_SUCCESS:
      return {
        ...state,
        loading: false,
        addBudgetResponseDetails: action.payload,
        error: '',
      };
    case EXPENSE_MANAGER_ADD_BUDGET_FAILURE:
      return {
        ...state,
        loading: false,
        addBudgetResponseDetails: '',
        error: action.payload,
      };
    case EXPENSE_MANAGER_LOAD_BUDGETS_SUCCESS:
      return {
        ...state,
        loading: false,
        loadBudgetsResponseDetails: action.payload,
        error: '',
      };
    case EXPENSE_MANAGER_LOAD_BUDGETS_FAILURE:
      return {
        ...state,
        loading: false,
        loadBudgetsResponseDetails: '',
        error: action.payload,
      };
    case EXPENSE_MANAGER_REMOVE_BUDGET_SUCCESS:
      return {
        ...state,
        loading: false,
        removeBudgetResponseDetails: action.payload,
        error: '',
      };
    case EXPENSE_MANAGER_REMOVE_BUDGET_FAILURE:
      return {
        ...state,
        loading: false,
        removeBudgetResponseDetails: '',
        error: action.payload,
      };
    case EXPENSE_MANAGER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default expenseManagerReducer;
