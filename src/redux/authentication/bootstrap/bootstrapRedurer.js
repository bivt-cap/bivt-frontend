/**
 * Bootstrap reducer
 *
 * @version 0.0.1
 * @author Eduardo Pereira do Carmo (https://github.com/eduardopcarmo)
 */

// Types
import {
  AUTH_TOKEN_IS_VALID,
  AUTH_TOKEN_IS_NOT_VALID,
  CIRCLES_INVITED,
  CIRCLES_JOINED,
  CIRCLES_NEED_CREATE,
  RESET,
} from './bootstrapTypes';

// Initial State
const bootstrapInitialState = {
  isLoading: true,
  isSignedIn: false,
  error: null,
  user: null,
  circles: null,
  initialRouteName: 'Bootstrap',
};

// Reducer
const bootstrapReducer = (state = bootstrapInitialState, action) => {
  // Type
  switch (action.type) {
    case RESET:
      return bootstrapInitialState;
    case AUTH_TOKEN_IS_VALID:
      return {
        ...state,
        isSignedIn: true,
        user: action.payload,
      };
    case AUTH_TOKEN_IS_NOT_VALID:
      return {
        ...state,
        isLoading: false,
        isSignedIn: false,
        error: 'Authentication Token is not Valid',
        initialRouteName: 'Login',
      };
    case CIRCLES_INVITED:
      return {
        ...state,
        isLoading: false,
        circles: action.payload,
        initialRouteName: 'ApproveCircle',
      };
    case CIRCLES_JOINED:
      return {
        ...state,
        isLoading: false,
        circles: action.payload,
        initialRouteName: 'DashBoard',
      };
    case CIRCLES_NEED_CREATE:
      return {
        ...state,
        isLoading: false,
        initialRouteName: 'CreateCircle',
      };
  }

  // No action defined
  return state;
};

// Export
export default bootstrapReducer;
