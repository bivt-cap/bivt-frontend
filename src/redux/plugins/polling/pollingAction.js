import {bivtURL} from '../../apis/bivtApi';

//Purpose of Action: Describe some changes that we want to make to the data inside of our application.
export const pollingLoadRequest = () => {
  return {
    type: 'POLLING_REQUEST',
  };
};

export const pollingLoadSuccess = (pollingData) => {
  return {
    type: 'POLLING_SUCCESS',
    payload: pollingData,
  };
};

export const pollingLoadFail = (errorMsg) => {
  return {
    type: 'POLLING_FAIL',
    payload: errorMsg,
  };
};
export const getActivePollList = (token, _circleId) => {
  const localToken = 'bearer ' + token;
  const headersInfo = {
    'content-type': 'application/json',
    authorization: localToken,
  };
  const config = {
    headers: headersInfo,
    params: {
      circleId: _circleId,
    },
  };
  return async (dispatch) => {
    try {
      const response = await bivtURL.get('/plugin/poll/getActives', config);

      if (response.status === 200) {
        console.log(response);
        dispatch(pollingLoadSuccess(response.data.data));
      } else {
        dispatch(pollingLoadFail('Active Polling List could not fetched'));
      }
    } catch (error) {
      dispatch(pollingLoadFail('Active Polling List could not fetched'));
    }
  };
};
