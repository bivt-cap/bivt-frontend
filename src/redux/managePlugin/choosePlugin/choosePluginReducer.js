/**
 * Choose plugin reducer
 *
 * @version 0.0.1
 * @author Arshdeep Singh (https://github.com/Singh-Arshdeep)
 */

import {
  CHOOSE_PLUGIN_REQUEST,
  CHOOSE_PLUGIN_SUCCESS,
  CHOOSE_PLUGIN_FAILURE,
} from './choosePluginTypes';

const choosePluginInitialState = {
  loading: false,
  choosePluginsResponseDetails: '',
  error: '',
};

let choosePluginReducer = (state = choosePluginInitialState, action) => {
  switch (action.type) {
    case CHOOSE_PLUGIN_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case CHOOSE_PLUGIN_SUCCESS:
      return {
        loading: false,
        choosePluginsResponseDetails: action.payload,
        error: '',
      };
    case CHOOSE_PLUGIN_FAILURE:
      return {
        loading: false,
        choosePluginsResponseDetails: '',
        error: action.payload,
      };
    default:
      return state;
  }
};

export default choosePluginReducer;
