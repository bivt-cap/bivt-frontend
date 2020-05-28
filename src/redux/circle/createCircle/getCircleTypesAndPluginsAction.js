/**
 * Fetch type of Circles and available corresponding plugins
 *
 * @version 0.0.1
 * @author Arshdeep Singh (https://github.com/Singh-Arshdeep)
 */

import {bivtURL} from '../../apis/bivtApi';

import {
  GET_CIRCLE_TYPES_AND_PLUGINS_REQUEST,
  GET_CIRCLE_TYPES_AND_PLUGINS_SUCCESS,
  GET_CIRCLE_TYPES_AND_PLUGINS_FAILURE,
} from './createCirlceTypes';

export const getCircleTypesAndPluginsRequest = () => {
  return {
    type: GET_CIRCLE_TYPES_AND_PLUGINS_REQUEST,
  };
};

export const getCircleTypesAndPluginsSuccess = (
  circleTypesAndPluginsDetail,
) => {
  return {
    type: GET_CIRCLE_TYPES_AND_PLUGINS_SUCCESS,
    payload: circleTypesAndPluginsDetail,
  };
};

export const getCircleTypesAndPluginsFailure = (error) => {
  return {
    type: GET_CIRCLE_TYPES_AND_PLUGINS_FAILURE,
    payload: error,
  };
};

/**
 * This function calls the REST api to get circle types and plugins details
 * The tempAuthToken is only for testing, once the user logsin they must use that auth
 * token to create a CIRCLE
 */
//For testing - add a temp auth token below:
const tempAuthToken = '';

export const getCircleTypesAndPluginsDetail = () => {
  const config = {
    headers: {Authorization: `Bearer ${tempAuthToken}`},
  };
  return async (dispatch) => {
    dispatch(getCircleTypesAndPluginsRequest());
    try {
      const response = await bivtURL.get(
        '/circle/getCircleTypesAndPluginSuggestions',
        config,
      );
      const circleTypesAndPluginsDetail = response.data.data;
      dispatch(getCircleTypesAndPluginsSuccess(circleTypesAndPluginsDetail));
    } catch (error) {
      const errorMsg = error.response.data.status.errors;
      dispatch(getCircleTypesAndPluginsFailure(errorMsg));
    }
  };
};
