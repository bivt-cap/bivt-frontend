/**
 * Expense Manager actions
 *
 * @version 0.0.1
 * @author Arshdeep Singh (https://github.com/Singh-Arshdeep)
 */

import {bivtURL} from '../../apis/bivtApi';

import {
  EXPENSE_MANAGER_REQUEST,
  EXPENSE_MANAGER_LOAD_BILLS_SUCCESS,
  EXPENSE_MANAGER_ADD_BILL_SUCCESS,
  EXPENSE_MANAGER_FAILURE,
} from './expenseManagerTypes';

export const expenseManagerRequest = () => {
  return {
    type: EXPENSE_MANAGER_REQUEST,
  };
};

export const expenseManagerLoadBillsSuccess = (loadBillsResponseDetails) => {
  return {
    type: EXPENSE_MANAGER_LOAD_BILLS_SUCCESS,
    payload: loadBillsResponseDetails,
  };
};

export const expenseManagerAddBillSuccess = (addBillResponseDetails) => {
  return {
    type: EXPENSE_MANAGER_ADD_BILL_SUCCESS,
    payload: addBillResponseDetails,
  };
};

export const expenseManagerFailure = (error) => {
  return {
    type: EXPENSE_MANAGER_FAILURE,
    payload: error,
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
        dispatch(expenseManagerFailure('Unauthorised'));
      } else if (error.response.status === 422) {
        dispatch(expenseManagerFailure(error.response.data.status.errors));
      } else {
        dispatch(expenseManagerFailure('Error occured, please try agian!'));
      }
    }
  };
};
