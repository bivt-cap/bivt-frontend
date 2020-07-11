const initialPolling = {
  pollLoading: true,
  pollingInformation: [],
  errorMsg: '',
};

let pollingReducer = (state = initialPolling, action) => {
  switch (action.type) {
    case 'POLLING_REQUEST':
      return {
        pollLoading: true,
      };
    case 'POLLING_SUCCESS':
      return {
        ...state,
        pollLoading: false,
        pollingInformation: action.payload,
      };
    case 'POLLING_FAIL':
      return {
        ...state,
        errorMsg: action.payload,
      };
    default:
      return state;
  }
};

export default pollingReducer;
