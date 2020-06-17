/**
 * Expense Manager actions
 *
 * @version 0.0.1
 * @author Arshdeep Singh (https://github.com/Singh-Arshdeep)
 */
import moment from 'moment';
import {bivtURL} from '../../apis/bivtApi';

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

export const expenseManagerRequest = () => {
  return {
    type: EXPENSE_MANAGER_REQUEST,
  };
};

export const expenseManagerFailure = (error) => {
  return {
    type: EXPENSE_MANAGER_FAILURE,
    payload: error,
  };
};

//********************************************************** */
//********************************************************** */
//************************ BILLS *************************** */
//********************************************************** */
//********************************************************** */

//Load Categories
export const expenseManagerLoadCategoriesSuccess = (
  loadCategoriesResponseDetails,
) => {
  return {
    type: EXPENSE_MANAGER_LOAD_CATEGORIES_SUCCESS,
    payload: loadCategoriesResponseDetails,
  };
};
export const expenseManagerLoadCategoriesFailure = (error) => {
  return {
    type: EXPENSE_MANAGER_LOAD_CATEGORIES_FAILURE,
    payload: error,
  };
};

//Load Bills
export const expenseManagerLoadBillsSuccess = (loadBillsResponseDetails) => {
  return {
    type: EXPENSE_MANAGER_LOAD_BILLS_SUCCESS,
    payload: loadBillsResponseDetails,
  };
};
export const expenseManagerLoadBillsFailure = (error) => {
  return {
    type: EXPENSE_MANAGER_LOAD_BILLS_FAILURE,
    payload: error,
  };
};

//Add Bill
export const expenseManagerAddBillSuccess = (addBillResponseDetails) => {
  return {
    type: EXPENSE_MANAGER_ADD_BILL_SUCCESS,
    payload: addBillResponseDetails,
  };
};
export const expenseManagerAddBillFailure = (error) => {
  return {
    type: EXPENSE_MANAGER_ADD_BILL_FAILURE,
    payload: error,
  };
};

//Delete Bills
export const expenseManagerRemoveBillSuccess = (removeBillResponseDetails) => {
  return {
    type: EXPENSE_MANAGER_REMOVE_BILL_SUCCESS,
    payload: removeBillResponseDetails,
  };
};
export const expenseManagerRemoveBillFailure = (error) => {
  return {
    type: EXPENSE_MANAGER_REMOVE_BILL_FAILURE,
    payload: error,
  };
};

/**
 * Fetch bill categories
 */
export const getBillCategories = (token) => {
  const config = {
    headers: {Authorization: `Bearer ${token}`},
  };
  return async (dispatch) => {
    dispatch(expenseManagerRequest);
    try {
      const response = await bivtURL.get(
        '/plugin/expenses/billCategories',
        config,
      );
      const loadCategoriesResponseDetails = response.data;
      if (loadCategoriesResponseDetails.status.id === 200) {
        dispatch(
          expenseManagerLoadCategoriesSuccess(
            loadCategoriesResponseDetails.data,
          ),
        );
      } else {
        dispatch(expenseManagerLoadCategoriesFailure('Error! try again later'));
      }
    } catch (error) {
      if (error.response.status === 401) {
        dispatch(expenseManagerLoadCategoriesFailure('Unauthorised'));
      } else if (error.response.status === 422) {
        dispatch(
          expenseManagerLoadCategoriesFailure(
            error.response.data.status.errors,
          ),
        );
      } else {
        dispatch(expenseManagerLoadCategoriesFailure('Error! try again later'));
      }
    }
  };
};

/**
 * Fetch bills
 */
export const getBills = (_circleId, token) => {
  const circleDetails = {
    circleId: _circleId,
  };
  const config = {
    headers: {Authorization: `Bearer ${token}`},
  };
  return async (dispatch) => {
    dispatch(expenseManagerRequest);
    try {
      const response = await bivtURL.post(
        '/plugin/expenses/bills',
        circleDetails,
        config,
      );
      const loadBillsResponseDetails = response.data;
      if (loadBillsResponseDetails.status.id === 200) {
        dispatch(expenseManagerLoadBillsSuccess(loadBillsResponseDetails.data));
      } else {
        dispatch(expenseManagerLoadBillsFailure('Error! try again later'));
      }
    } catch (error) {
      console.log(error);
      if (error.response.status === 401) {
        dispatch(expenseManagerLoadBillsFailure('Unauthorised'));
      } else if (error.response.status === 422) {
        dispatch(
          expenseManagerLoadBillsFailure(error.response.data.status.errors),
        );
      } else {
        dispatch(expenseManagerLoadBillsFailure('Error! try again later'));
      }
    }
  };
};

/**
 * This function calls the REST api to add a bill to the DB
 */
export const addBill = (_billDetails, _circleId, token) => {
  const billDetails = {
    billName: _billDetails.billName,
    billAmount: _billDetails.billAmount,
    billCategory: _billDetails.billCategory,
    billDate: moment(_billDetails.billDate).format('YYYY-MM-DD HH:mm:ss'),
    circleId: _circleId,
  };
  const config = {
    headers: {Authorization: `Bearer ${token}`},
  };
  return async (dispatch) => {
    dispatch(expenseManagerRequest);
    try {
      const response = await bivtURL.post(
        '/plugin/expenses/addBill',
        billDetails,
        config,
      );
      const addBillResponseDetails = response.data;
      dispatch(expenseManagerAddBillSuccess(addBillResponseDetails.status.id));
    } catch (error) {
      if (error.response.status === 401) {
        dispatch(expenseManagerAddBillFailure('Unauthorised'));
      } else if (error.response.status === 422) {
        dispatch(
          expenseManagerAddBillFailure(error.response.data.status.errors),
        );
      } else {
        dispatch(expenseManagerAddBillFailure('Error! try again later'));
      }
    }
  };
};

/**
 * This function calls the REST api to delete the bill
 */
export const removeBill = (_billId, _circleId, token) => {
  const billDetails = {
    billId: _billId,
    circleId: _circleId,
  };
  const config = {
    headers: {Authorization: `Bearer ${token}`},
  };
  return async (dispatch) => {
    dispatch(expenseManagerRequest);
    try {
      const response = await bivtURL.post(
        '/plugin/expenses/removeBill',
        billDetails,
        config,
      );
      const removeBillResponseDetails = response.data;
      console.log(removeBillResponseDetails);
      dispatch(
        expenseManagerRemoveBillSuccess(removeBillResponseDetails.status.id),
      );
    } catch (error) {
      console.log(error);
      if (error.response.status === 401) {
        dispatch(expenseManagerRemoveBillFailure('Unauthorised'));
      } else if (error.response.status === 422) {
        dispatch(
          expenseManagerRemoveBillFailure(error.response.data.status.errors),
        );
      } else {
        dispatch(expenseManagerRemoveBillFailure('Error! try again later'));
      }
    }
  };
};

//********************************************************** */
//********************************************************** */
//************************ BUDGET ************************** */
//********************************************************** */
//********************************************************** */

//Add Budget
export const expenseManagerAddBudgetSuccess = (addBudgetResponseDetails) => {
  return {
    type: EXPENSE_MANAGER_ADD_BUDGET_SUCCESS,
    payload: addBudgetResponseDetails,
  };
};
export const expenseManagerAddBudgetFailure = (error) => {
  return {
    type: EXPENSE_MANAGER_ADD_BUDGET_FAILURE,
    payload: error,
  };
};

//Load Budgets
export const expenseManagerLoadBudgetsSuccess = (
  loadBudgetsResponseDetails,
) => {
  return {
    type: EXPENSE_MANAGER_LOAD_BUDGETS_SUCCESS,
    payload: loadBudgetsResponseDetails,
  };
};
export const expenseManagerLoadBudgetsFailure = (error) => {
  return {
    type: EXPENSE_MANAGER_LOAD_BUDGETS_FAILURE,
    payload: error,
  };
};

//Delete Budget
export const expenseManagerRemoveBudgetSuccess = (
  removeBudgetResponseDetails,
) => {
  return {
    type: EXPENSE_MANAGER_REMOVE_BUDGET_SUCCESS,
    payload: removeBudgetResponseDetails,
  };
};
export const expenseManagerRemoveBudgetFailure = (error) => {
  return {
    type: EXPENSE_MANAGER_REMOVE_BUDGET_FAILURE,
    payload: error,
  };
};

/**
 * This function calls the REST api to add a budget to the DB
 */
export const addBudget = (_budgetDetails, _circleId, token) => {
  const budgetDetails = {
    budgetName: _budgetDetails.budgetName,
    budgetAmount: _budgetDetails.budgetAmount,
    budgetStartDate: moment(_budgetDetails.budgetFrom).format(
      'YYYY-MM-DD HH:mm:ss',
    ),
    budgetEndDate: moment(_budgetDetails.budgetTo).format(
      'YYYY-MM-DD HH:mm:ss',
    ),
    circleId: _circleId,
  };
  const config = {
    headers: {Authorization: `Bearer ${token}`},
  };
  return async (dispatch) => {
    dispatch(expenseManagerRequest);
    try {
      const response = await bivtURL.post(
        '/plugin/expenses/addBudget',
        budgetDetails,
        config,
      );
      const addBudgetResponseDetails = response.data;
      dispatch(
        expenseManagerAddBudgetSuccess(addBudgetResponseDetails.status.id),
      );
    } catch (error) {
      if (error.response.status === 401) {
        dispatch(expenseManagerAddBillFailure('Unauthorised'));
      } else if (error.response.status === 422) {
        dispatch(
          expenseManagerAddBillFailure(error.response.data.status.errors),
        );
      } else {
        dispatch(expenseManagerAddBillFailure('Error! try again later'));
      }
    }
  };
};

/**
 * Fetch budgets
 */
export const getBudgets = (_circleId, token) => {
  const circleDetails = {
    circleId: _circleId,
  };
  const config = {
    headers: {Authorization: `Bearer ${token}`},
  };
  return async (dispatch) => {
    dispatch(expenseManagerRequest);
    try {
      const response = await bivtURL.post(
        '/plugin/expenses/budgets',
        circleDetails,
        config,
      );
      const loadBudgetsResponseDetails = response.data;
      if (loadBudgetsResponseDetails.status.id === 200) {
        dispatch(
          expenseManagerLoadBudgetsSuccess(loadBudgetsResponseDetails.data),
        );
      } else {
        dispatch(expenseManagerLoadBudgetsFailure('Error! try again later'));
      }
    } catch (error) {
      console.log(error);
      if (error.response.status === 401) {
        dispatch(expenseManagerLoadBudgetsFailure('Unauthorised'));
      } else if (error.response.status === 422) {
        dispatch(
          expenseManagerLoadBudgetsFailure(error.response.data.status.errors),
        );
      } else {
        dispatch(expenseManagerLoadBudgetsFailure('Error! try again later'));
      }
    }
  };
};

/**
 * This function calls the REST api to delete a budget
 */
export const removeBudget = (_budgetId, _circleId, token) => {
  const budgetDetails = {
    budgetId: _budgetId,
    circleId: _circleId,
  };
  const config = {
    headers: {Authorization: `Bearer ${token}`},
  };
  return async (dispatch) => {
    dispatch(expenseManagerRequest);
    try {
      const response = await bivtURL.post(
        '/plugin/expenses/removeBudget',
        budgetDetails,
        config,
      );
      const removeBudgetResponseDetails = response.data;
      dispatch(
        expenseManagerRemoveBudgetSuccess(
          removeBudgetResponseDetails.status.id,
        ),
      );
    } catch (error) {
      console.log(error);
      if (error.response.status === 401) {
        dispatch(expenseManagerRemoveBudgetFailure('Unauthorised'));
      } else if (error.response.status === 422) {
        dispatch(
          expenseManagerRemoveBudgetFailure(error.response.data.status.errors),
        );
      } else {
        dispatch(expenseManagerRemoveBudgetFailure('Error! try again later'));
      }
    }
  };
};
