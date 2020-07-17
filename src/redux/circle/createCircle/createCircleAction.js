/**
 * Create circle actions
 *
 * @version 0.0.1
 * @author Arshdeep Singh (https://github.com/Singh-Arshdeep)
 */

import {bivtURL} from '../../apis/bivtApi';
import {
  CREATE_CIRCLE_REQUEST,
  CREATE_CIRCLE_SUCCESS,
  CREATE_CIRCLE_FAILURE,
} from './createCirlceTypes';

export const createCircleRequest = () => {
  return {
    type: CREATE_CIRCLE_REQUEST,
  };
};

export const createCircleSuccess = (circleRegistrationDetails) => {
  return {
    type: CREATE_CIRCLE_SUCCESS,
    payload: circleRegistrationDetails,
  };
};

export const createCircleFailure = (error) => {
  return {
    type: CREATE_CIRCLE_FAILURE,
    payload: error,
  };
};

/**
 * This function calls the REST api to create a circle
 * The tempAuthToken is only for testing, once the user logsin they must use that auth token
 * to create a circle
 */

export const createCircle = (createCircleDetails, token) => {
  const circleInfo = {
    name: createCircleDetails.circleName,
    image: createCircleDetails.selectedImage,
  };
  const config = {
    headers: {Authorization: `Bearer ${token}`},
  };

  return async (dispatch) => {
    dispatch(createCircleRequest);
    try {
      const response = await bivtURL.post('/circle/create', circleInfo, config);
      if (response.status === 200) {
        dispatch(createCircleSuccess(response.data.data));
      } else {
        dispatch(createCircleFailure(response.data.status.errors));
      }
    } catch (error) {
      const errorMsg = error.response.data.status.errors;
      dispatch(createCircleFailure(errorMsg));
    }
  };
};
