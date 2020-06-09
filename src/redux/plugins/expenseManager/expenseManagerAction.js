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
    billDate: moment(_billDetails.billDate).format(moment.HTML5_FMT.DATE),
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
