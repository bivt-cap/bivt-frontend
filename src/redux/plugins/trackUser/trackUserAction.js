/**
 * Actions for tracking family
 *
 * @version 0.0.1
 * @author Yalcin Tatar (https://github.com/yalcinos)
 */
import {Platform} from 'react-native';
import * as Location from 'expo-location';
import {bivtURL} from '../../apis/bivtApi';

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
export const circleMemberFetchFail = (errorMessage) => {
  return {
    type: 'MEMBER_OF_CIRCLE_FAIL',
    payload: errorMessage,
  };
};

export const userWatchLocation = (userLocationDetails) => {
  return {
    type: 'USER_LOCATION_TRACK_SUCCESS',
    payload: userLocationDetails,
  };
};
export const mapLoadSuccess = (userLocationDetails) => {
  return {
    type: 'MAP_INTIAL_SUCCESS',
    payload: userLocationDetails,
  };
};
export const fetchMemberInCircleSuccess = (circleMembers) => {
  return {
    type: 'GET_USERS_OF_CIRCLE_SUCCESS',
    payload: circleMembers,
  };
};
export const postLocationToDBSuccess = () => {
  return {
    type: 'POST_USER_LOCATION_SUCCESS',
  };
};
export const postLocationToDBFail = (errorMessage) => {
  return {
    type: 'POST_USER_LOCATION_FAIL',
    payload: errorMessage,
  };
};
export const getLocationFromDBSuccess = (coordinates) => {
  return {
    type: 'GET_LOCATION_FROM_DB_SUCCESS',
    payload: coordinates,
  };
};
export const getLocationFromDBFail = (errorMessage) => {
  return {
    type: 'GET_LOCATION_FROM_DB_FAIL',
    payload: errorMessage,
  };
};

export const trackLocationInBackGround = async () => {
  if (Platform.OS === 'android') {
    await Location.startLocationUpdatesAsync('watchLocation', {
      accuracy: Location.Accuracy.Balanced,
      timeInterval: 10000,
    });
  } else if (Platform.OS === 'ios') {
    await Location.startLocationUpdatesAsync('watchLocation', {
      accuracy: Location.Accuracy.High,
      timeInterval: 1000 * 60 * 2,
      distanceInterval: 20000,
    });
  }
};

// export const updateUserLocation
export const getInitialLocation = async (dispatch) => {
  let {status} = await Location.requestPermissionsAsync();
  if (status !== 'granted') {
    dispatch(mapLoadFail('Please give permission for accessing your location'));
  }
  let location = await Location.getCurrentPositionAsync({});
  if (location !== null) {
    dispatch(
      mapLoadSuccess({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      }),
    );
  }
};
export const postMemberLocationsToDB = (token, coordinates) => {
  const localToken = 'bearer ' + token;

  const headersInfo = {
    'content-type': 'application/json',
    authorization: localToken,
  };
  const config = {
    headers: headersInfo,
  };
  const memberCoordinate = {
    latitude: coordinates[0].coords.latitude,
    longitude: coordinates[0].coords.longitude,
  };
  // console.log(memberCoordinate);
  return async (dispatch) => {
    try {
      const response = await bivtURL.post(
        '/plugin/tracking/setPosition',
        memberCoordinate,
        config,
      );

      if (response.status === 200) {
        dispatch(postLocationToDBSuccess);
      } else {
        dispatch(
          postLocationToDBFail(
            'Members could not fetched or you have no member in the circle.',
          ),
        );
      }
    } catch (error) {
      const errorMsg = error.message;
      console.log(errorMsg);
      dispatch(
        postLocationToDBFail(
          'Members could not fetched or you have no member in the circle.',
        ),
      );
    }
  };
};

export const getMembersInformationsInCircle = (token, _circleId) => {
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
      // dispatch(mapLoadRequest);
      const response = await bivtURL.get('/circle/getMemberOfACircle', config);

      if (response.status === 200) {
        dispatch(fetchMemberInCircleSuccess(response.data.data));
      } else {
        dispatch(
          circleMemberFetchFail(
            'Members could not fetched or you have no member in the circle.',
          ),
        );
      }
    } catch (error) {
      const errorMsg = error.message;
      console.log(errorMsg);
      dispatch(
        circleMemberFetchFail(
          'Members could not fetched or you have no member in the circle.',
        ),
      );
    }
  };
};

export const getLocationsFromDB = (token, _circleId) => {
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
      const response = await bivtURL.get(
        '/plugin/tracking/getPositions',
        config,
      );

      if (response.status === 200) {
        dispatch(getLocationFromDBSuccess(response.data.data));
      } else {
        dispatch(getLocationFromDBFail('Location could not fetch from DB. '));
      }
    } catch (error) {
      console.log(error);
      dispatch(getLocationFromDBFail(error));
    }
  };
};
