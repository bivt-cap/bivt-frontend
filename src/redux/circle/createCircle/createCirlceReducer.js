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
  GET_CIRCLE_TYPES_AND_PLUGINS_REQUEST,
  GET_CIRCLE_TYPES_AND_PLUGINS_SUCCESS,
  GET_CIRCLE_TYPES_AND_PLUGINS_FAILURE,
} from './createCirlceTypes';

const createCircleInitialState = {
  loading: false,
  circleRegistrationDetails: null,
  circleTypesAndPluginsDetails: '',
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
        ...state,
        loading: false,
        circleRegistrationDetails: action.payload,
        error: '',
      };
    case CREATE_CIRCLE_FAILURE:
      return {
        ...state,
        loading: false,
        circleRegistrationDetails: null,
        error: action.payload,
      };
    case GET_CIRCLE_TYPES_AND_PLUGINS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_CIRCLE_TYPES_AND_PLUGINS_SUCCESS:
      return {
        ...state,
        loading: false,
        circleTypesAndPluginsDetails: action.payload,
        error: '',
      };
    case GET_CIRCLE_TYPES_AND_PLUGINS_FAILURE:
      return {
        ...state,
        loading: false,
        circleTypesAndPluginsDetails: '',
        error: action.payload,
      };
    default:
      return state;
  }
};

export default createCirlceReducer;
