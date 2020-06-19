const userLocationDetails = {
  mapLoading: true,
  circleLoading: true,
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
        ...state,
        userCoordinates: null,
        mapLoading: true,
        errorMsg: action.payload,
      };
    case 'USER_LOCATION_TRACK_SUCCESS':
      return {
        ...state,
        userCoordinates: action.payload,
        mapLoading: false,
      };
    case 'GET_USERS_OF_CIRCLE_SUCCESS':
      return {
        ...state,
        circleLoading: false,
        membersInCircle: action.payload,
      };
    case 'MEMBER_OF_CIRCLE_FAIL':
      return {
        ...state,
        errorMsg: action.payload,
      };
    case 'MAP_INTIAL_SUCCESS':
      return {
        ...state,
        userCoordinates: action.payload,
        mapLoading: false,
      };
    case 'POST_USER_LOCATION_SUCCESS':
      return {
        ...state,
        userLocationLoading: true,
      };
    default:
      return state;
  }
};
export default trackUserReducer;
