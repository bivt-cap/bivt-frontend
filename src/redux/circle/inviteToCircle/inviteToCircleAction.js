/**
 * Invite to circle actions
 *
 * @version 0.0.1
 * @author Arshdeep Singh (https://github.com/Singh-Arshdeep)
 */

import {bivtURL} from '../../apis/bivtApi';

import {
  INVITE_TO_CIRCLE_REQUEST,
  INVITE_TO_CIRCLE_SUCCESS,
  INVITE_TO_CIRCLE_FAILURE,
} from './inviteToCirlceTypes';

export const inviteToCircleRequest = () => {
  return {
    type: INVITE_TO_CIRCLE_REQUEST,
  };
};

export const inviteToCircleSuccess = (inviteToCircleResponseDetails) => {
  return {
    type: INVITE_TO_CIRCLE_SUCCESS,
    payload: inviteToCircleResponseDetails,
  };
};

export const inviteToCircleFailure = (error) => {
  return {
    type: INVITE_TO_CIRCLE_FAILURE,
    payload: error,
  };
};

/**
 * This function calls the REST api to invite new members to a circle
 * The tempAuthToken is only for testing, once the user login they must use that auth token
 */
//For testing - add a temp auth token below:
const tempAuthToken = '';

export const inviteToCircle = (inviteToCircleDetails, _circleId) => {
  const inviteToCircleInfo = {
    email: inviteToCircleDetails.inviteeEmail,
    circleId: _circleId,
  };
  const config = {
    headers: {Authorization: `Bearer ${tempAuthToken}`},
  };
  return async (dispatch) => {
    dispatch(inviteToCircleRequest);
    try {
      const response = await bivtURL.post(
        '/circle/inviteUser',
        inviteToCircleInfo,
        config,
      );
      const inviteToCircleResponseDetails = response.data;
      dispatch(inviteToCircleSuccess('User invited successfully'));
    } catch (error) {
      const errorMsg = error.response.data;
      dispatch(inviteToCircleFailure(errorMsg));
    }
  };
};
