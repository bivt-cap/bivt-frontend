/**
 * Invite to circle reducer
 *
 * @version 0.0.1
 * @author Arshdeep Singh (https://github.com/Singh-Arshdeep)
 */

import {
  INVITE_TO_CIRCLE_REQUEST,
  INVITE_TO_CIRCLE_SUCCESS,
  INVITE_TO_CIRCLE_FAILURE,
} from './inviteToCirlceTypes';

const inviteToCircleInitialState = {
  loading: false,
  inviteToCircleResponseDetails: '',
  error: '',
};

let inviteToCirlceReducer = (state = inviteToCircleInitialState, action) => {
  switch (action.type) {
    case INVITE_TO_CIRCLE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case INVITE_TO_CIRCLE_SUCCESS:
      return {
        loading: false,
        inviteToCircleResponseDetails: action.payload,
        error: '',
      };
    case INVITE_TO_CIRCLE_FAILURE:
      return {
        loading: false,
        inviteToCircleResponseDetails: '',
        error: action.payload,
      };
    default:
      return state;
  }
};

export default inviteToCirlceReducer;
