/**
 * Bootstrap actions
 *
 * @version 0.0.1
 * @author Eduardo Pereira do Carmo (https://github.com/eduardopcarmo)
 */

// Axios (Default API)
import {bivtURL} from '../../apis/bivtApi';

// Types
import {
  AUTH_TOKEN_IS_VALID,
  AUTH_TOKEN_IS_NOT_VALID,
  CIRCLES_INVITED,
  CIRCLES_JOINED,
  CIRCLES_NEED_CREATE,
  RESET,
} from './bootstrapTypes';

// Actions

// Reset Bootstrap to the initial state
export const resetBootstrap = () => {
  return {
    type: RESET,
  };
};

// Authentication Token is Valid
export const authenticationTokenIsValid = (payload) => {
  return {
    type: AUTH_TOKEN_IS_VALID,
    payload,
  };
};

// Authentication Token is NOT Valid
export const authenticationTokenIsNotValid = () => {
  return {
    type: AUTH_TOKEN_IS_NOT_VALID,
  };
};

// The user was invited to join a Circle
export const userWasInvitedToJoinACircle = (payload) => {
  return {
    type: CIRCLES_INVITED,
    payload,
  };
};

// The user belongs to a Circle
export const userBelongsToaCircle = (payload) => {
  return {
    type: CIRCLES_JOINED,
    payload,
  };
};

// The user dont belongs to a circle
export const userDontBelongsToaCircle = () => {
  return {
    type: CIRCLES_NEED_CREATE,
  };
};

// Async Functions

/**
 * Check if the authentication token is valid
 */
export const checkAuthenticationToken = (token) => {
  return (dispatch) => {
    bivtURL
      .get('/auth/check', {
        headers: {Authorization: `Bearer ${token}`},
      })
      .then((response) => {
        if (response.status === 200) {
          dispatch(authenticationTokenIsValid(response.data.data));
        } else {
          dispatch(authenticationTokenIsNotValid());
        }
      })
      .catch((error) => {
        dispatch(authenticationTokenIsNotValid());
      });
  };
};

/**
 * Get the Circles that the user is part of
 */
export const getCirclesUserIsPartOf = (token) => {
  return (dispatch) => {
    bivtURL
      .get('/circle/byUser', {
        headers: {Authorization: `Bearer ${token}`},
      })
      .then((response) => {
        if (response.status === 200) {
          const circles = response.data.data.circles;

          if (circles) {
            const inCircle = circles.find((circle) => circle.joinedAt !== null);
            // User belongs to a Circle?
            if (inCircle !== null) {
              dispatch(userBelongsToaCircle(circles));
            } else {
              dispatch(userWasInvitedToJoinACircle(circles));
            }
          } else {
            dispatch(userDontBelongsToaCircle());
          }
        } else {
          dispatch(userDontBelongsToaCircle());
        }
      })
      .catch((error) => {
        console.log(error);
        if (error.response) {
          if (error.response.status === 404) {
            dispatch(userDontBelongsToaCircle());
          } else {
            // Show an error
            // [TODO]
            dispatch(userDontBelongsToaCircle());
          }
        } else {
          // Show an error
          // [TODO]
          dispatch(userDontBelongsToaCircle());
        }
      });
  };
};
