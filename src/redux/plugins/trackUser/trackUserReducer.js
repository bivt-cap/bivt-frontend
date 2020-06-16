const userLocationDetails = {
  userCoordinates: null,
  membersInCircle: null,
  mapLoading: false,
  circleLoading: false,
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
        mapLoading: true,
        errorMsg: action.payload,
      };
    case 'USER_LOCATION_TRACK':
      return {
        userCoordinates: action.payload,
        mapLoading: false,
        errorMsg: '',
      };
    case 'GET_USER_INFORMATIONS_IN_SAME_GROUP':
      return {
        circleLoading: true,
        membersInCircle: action.payload,
        mapLoading: false,
        errorMsg: '',
      };
    case 'MEMBER_OF_CIRCLE_FAIL':
      return {
        userCoordinates: null,
        membersInCircle: null,
        mapLoading: false,
        errorMsg: action.payload,
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
