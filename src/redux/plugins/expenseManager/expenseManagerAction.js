/**
 * Expense Manager actions
 *
 * @version 0.0.1
 * @author Arshdeep Singh (https://github.com/Singh-Arshdeep)
 */

import {bivtURL} from '../../apis/bivtApi';

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

export const expenseManagerRequest = () => {
  return {
    type: EXPENSE_MANAGER_REQUEST,
  };
};

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

//Save Bills
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

export const expenseManagerFailure = (error) => {
  return {
    type: EXPENSE_MANAGER_FAILURE,
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
 * This function calls the REST api to add a bill to the DB
 */
export const addBill = (_billDetails, _circleId, token) => {
  const billDetails = {
    billName: _billDetails.billName,
    billAmount: _billDetails.billAmount,
    billCategory: _billDetails.billCategory,
    billDate: _billDetails.billDate.toISOString().split('T')[0],
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
