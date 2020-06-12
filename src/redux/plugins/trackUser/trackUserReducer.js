const userLocationDetails = {
  userCoordinates: null,
  mapLoading: false,
  errorMsg: '',
};

let trackUserReducer = (state = userLocationDetails, action) => {
  switch (action.type) {
    case 'MAP_REQUEST':
      return {
        ...state,
        mapLoading: true,
      };
    case 'MAP_INTIAL_FAIL':
      return {
        userCoordinates: null,
        mapLoading: false,
        errorMsg: action.payload,
      };
    case 'USER_LOCATION_TRACK':
      return {
        userCoordinates: action.payload,
        mapLoading: false,
        errorMsg: '',
      };
    case 'MAP_INTIAL_SUCCESS':
      return {
        userCoordinates: action.payload,
        mapLoading: false,
        errorMsg: '',
      };
    default:
      return state;
  }
};
export default trackUserReducer;
