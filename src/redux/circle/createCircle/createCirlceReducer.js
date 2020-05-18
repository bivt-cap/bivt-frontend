/**
 * Create circle reducer
 *
 * @version 0.0.1
 * @author Arshdeep Singh (https://github.com/Singh-Arshdeep)
 */

import {
  CREATE_CIRCLE_REQUEST,
  CREATE_CIRCLE_SUCCESS,
  CREATE_CIRCLE_FAILURE,
} from './createCirlceTypes';

const createCircleInitialState = {
  loading: false,
  circleRegistrationDetails: '',
  error: '',
};

let createCirlceReducer = (state = createCircleInitialState, action) => {
  switch (action.type) {
    case CREATE_CIRCLE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case CREATE_CIRCLE_SUCCESS:
      return {
        loading: false,
        circleRegistrationDetails: action.payload,
        error: '',
      };
    case CREATE_CIRCLE_FAILURE:
      return {
        loading: false,
        circleRegistrationDetails: '',
        error: action.payload,
      };
    default:
      return state;
  }
};

export default createCirlceReducer;
