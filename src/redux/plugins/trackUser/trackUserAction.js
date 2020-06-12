/**
 * Actions for tracking family
 *
 * @version 0.0.1
 * @author Yalcin Tatar (https://github.com/yalcinos)
 */

//Purpose of Action: Describe some changes that we want to make to the data inside of our application.
export const mapLoadRequest = () => {
  return {
    type: 'MAP_REQUEST',
  };
};
export const mapLoadFail = (errorMessage) => {
  return {
    type: 'MAP_INTIAL_FAIL',
    payload: errorMessage,
  };
};
export const userWatchLocation = (userLocationDetails) => {
  return {
    type: 'USER_LOCATION_TRACK',
    payload: userLocationDetails,
  };
};
export const mapLoadSuccess = (userLocationDetails) => {
  return {
    type: 'MAP_INTIAL_SUCCESS',
    payload: userLocationDetails,
  };
};
