import {
  FETCH_USER_REQUEST,
  FETCH_USER_SUCCESS,
  FETCH_USER_FAILURE,
} from './userTypes';

import jsonPlaceholder from '../../apis/jsonPlaceHolder';
import axios from 'axios';

export const fetchUserRequest = () => {
  return {
    type: FETCH_USER_REQUEST,
  };
};

export const fetchUserSuccess = (users) => {
  return {
    type: FETCH_USER_SUCCESS,
    payload: users,
  };
};

export const fetchUserFailure = (error) => {
  return {
    type: FETCH_USER_FAILURE,
    payload: error,
  };
};

//Will return another function instead of an action
export const fetchUsers = () => {
  return (dispatch) => {
    dispatch(fetchUserRequest);
    axios
      .get('https://jsonplaceholder.typicode.com/users')
      .then((response) => {
        const users = response.data;
        dispatch(fetchUserSuccess(users));
      })
      .catch((error) => {
        const errorMsg = error.message;
        dispatch(fetchUserFailure(errorMsg));
      });
  };
};
//Alternative Technique
export const fetchUsersAsync = () => {
  return async (dispatch) => {
    dispatch(fetchUserRequest);
    try {
      const response = await jsonPlaceholder.get('/users');
      // console.log(response);
      dispatch(fetchUserSuccess(response.data));
    } catch (error) {
      const errorMsg = error.message;
      dispatch(fetchUserFailure(errorMsg));
    }
  };
};
