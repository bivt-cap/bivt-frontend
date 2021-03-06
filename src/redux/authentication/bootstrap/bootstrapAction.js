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
  CIRCLES_JOINED_NO_PLUGIN,
  CIRCLES_JOINED_NO_MEMBERS,
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

// The user belongs to a Circle
export const userBelongsToaCircleButNotPlugins = (payload) => {
  return {
    type: CIRCLES_JOINED_NO_PLUGIN,
    payload,
  };
};

export const userBelongsToaCircleButNotMembers = (payload) => {
  return {
    type: CIRCLES_JOINED_NO_MEMBERS,
    payload,
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
      .then(async (response) => {
        if (response.status === 200) {
          const circles = response.data.data.circles;
          if (circles) {
            // load all member and Plugins in all groups
            for (let i = 0; i < circles.length; i++) {
              // Load all member in the user group
              const members = await bivtURL
                .get('/circle/getMemberOfACircle', {
                  headers: {Authorization: `Bearer ${token}`},
                  params: {circleId: circles[i].id},
                })
                .then((responseMembers) => {
                  if (responseMembers.status === 200) {
                    return responseMembers.data.data.map((member) => {
                      return {...member};
                    });
                  }
                })
                .catch((error) => {});

              // Load all plugins in the user group
              const plugins = await bivtURL
                .get('/plugin/getPluginOnACircle', {
                  headers: {Authorization: `Bearer ${token}`},
                  params: {circleId: circles[i].id},
                })
                .then((responsePlugins) => {
                  if (responsePlugins.status === 200) {
                    return responsePlugins.data.data.map((pluginId) => {
                      return pluginId;
                    });
                  }
                })
                .catch((error) => {});

              // Update the object
              circles[i] = {
                ...circles[i],
                members,
                plugins,
              };
            }

            // User belongs to a Circle?
            const inCircle = circles.find((circle) => circle.joinedAt !== null);
            if (inCircle !== null) {
              // Circle has plugins
              if (inCircle.plugins) {
                // Circle has member (more than 1)
                if (inCircle.members.length <= 1) {
                  dispatch(userBelongsToaCircleButNotMembers(circles));
                } else {
                  dispatch(userBelongsToaCircle(circles));
                }
              } else {
                dispatch(userBelongsToaCircleButNotPlugins(circles));
              }
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
