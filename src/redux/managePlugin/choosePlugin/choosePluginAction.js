/**
 * Choose plugin actions
 *
 * @version 0.0.1
 * @author Arshdeep Singh (https://github.com/Singh-Arshdeep)
 */

import {bivtURL} from '../../apis/bivtApi';

import {
  CHOOSE_PLUGIN_REQUEST,
  CHOOSE_PLUGIN_SUCCESS,
  CHOOSE_PLUGIN_FAILURE,
} from './choosePluginTypes';

export const choosePluginRequest = () => {
  return {
    type: CHOOSE_PLUGIN_REQUEST,
  };
};

export const choosePluginSuccess = (choosePluginsResponseDetails) => {
  return {
    type: CHOOSE_PLUGIN_SUCCESS,
    payload: choosePluginsResponseDetails,
  };
};

export const choosePluginFailure = (error) => {
  return {
    type: CHOOSE_PLUGIN_FAILURE,
    payload: error,
  };
};

/**
 * This function calls the REST api to add three selected plugins to the DB
 * There is no API avalable to store receive all three plugins at one, so fow now
 * we are using a for loop. I am not using axios.all intentially.
 * The tempAuthToken is only for testing, once the user login they must use that auth token
 */
//For testing - add a temp auth token below:
const tempAuthToken = '';

export const savePlugin = (chosenPlugins, _circleId) => {
  const choosePluginInfo = {
    id: chosenPlugins,
    circleId: _circleId,
  };
  const config = {
    headers: {Authorization: `Bearer ${tempAuthToken}`},
  };
  return async (dispatch) => {
    dispatch(choosePluginRequest);
    try {
      const response = await bivtURL.post(
        '/plugin/addPluginFromCircle',
        choosePluginInfo,
        config,
      );
      const choosePluginsResponseDetails = response.data;
      dispatch(choosePluginSuccess(choosePluginsResponseDetails));
    } catch (error) {
      const errorMsg = error.response.data.status.errors;
      dispatch(choosePluginFailure(errorMsg));
    }
  };
};
