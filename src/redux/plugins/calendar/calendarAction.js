/**
 * Calendar actions
 *
 * @version 0.0.1
 * @author Eduardo Pereira do Carmo (https://github.com/eduardopcarmo)
 */

// Axios (Default API)
import {bivtURL} from '../../apis/bivtApi';

// Types
import {EVENT_ERROR, EVENT_INSERT, EVENT_GET_LIST} from './calendarTypes';

// Actions

/**
 * An Error Occurred
 * @param {*} payload Error
 */
export const errorOccurred = (payload) => {
  return {
    type: EVENT_ERROR,
    payload,
  };
};

/**
 * An Event was created
 * @param {*} payload Error
 */
export const eventCreated = (payload) => {
  return {
    type: EVENT_INSERT,
    payload,
  };
};

/**
 * List of events was loaded
 * @param {*} payload Error
 */
export const eventListLoaded = (payload) => {
  return {
    type: EVENT_GET_LIST,
    payload,
  };
};

// Async Functions
/**
 * Create a new Event
 * @param {String} token User Token
 * @param {Number} circleId Circle Id
 * @param {String} title Event Title
 * @param {String} startOn Start datetime (yyyy-MM-dd HH:MM:SS)
 * @param {String} endOn End datetime (yyyy-MM-dd HH:MM:SS)
 * @param {String} note Notes about the event
 * @param {Array[Number]} membersId Member User Id List
 * @param {Array[File]} photos Photos File List
 */
export const createEvent = (
  token,
  circleId,
  title,
  startOn,
  endOn,
  note,
  membersId,
  photos,
) => {
  return (dispatch) => {
    bivtURL
      .post(
        '/plugin/event/add',
        {
          circleId,
          title,
          startOn,
          endOn,
          note,
        },
        {
          headers: {Authorization: `Bearer ${token}`},
        },
      )
      .then((response) => {
        if (response.status === 200) {
          return response.data.data.id;
        } else {
          throw new Error('An error occurred. Please try again later');
        }
      })
      .then(async (id) => {
        // Send the members
        if (membersId !== null && membersId.length > 0) {
          for (let i = 0; i < membersId.length; i++) {
            await bivtURL
              .post(
                '/plugin/event/addMember',
                {
                  circleId,
                  id,
                  userId: membersId[i],
                },
                {
                  headers: {Authorization: `Bearer ${token}`},
                },
              )
              .then((response) => {
                return;
              })
              .catch((error) => {
                return;
              });
          }
        }
        return id;
      })
      .then(async (id) => {
        console.log(photos);
        console.log(photos.length);

        // Send all photos
        if (photos != null && photos.length > 0) {
          for (let i; i < photos.length; i++) {
            const fData = new FormData();
            fData.append('Note', {
              uri: photos[i], // 'file://', //Your Image File Path
              type: 'image/jpeg',
              name: `${id}_${i}.jpg`,
            });
            // Submit the file
            const photosResponse = await bivtURL.post(
              `/plugin/event/addPhoto?circleId=${circleId}&id=${id}`,
              fData,
              {
                headers: {
                  Accept: 'application/json',
                  'Content-Type': 'multipart/form-data',
                  Authorization: `Bearer ${token}`,
                },
              },
            );
          }
        }
        return id;
      })
      .then((id) => {
        dispatch(eventCreated(id));
      })
      .catch((error) => {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          dispatch(errorOccurred(error.response.data.status.errors[0]));
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
          // http.ClientRequest in node.js
          dispatch(errorOccurred('An error occurred. Please try again later'));
        } else {
          // Something happened in setting up the request that triggered an Error
          dispatch(errorOccurred(error.message));
        }
      });
  };
};

/**
 * Load all events
 * @param {String} token User Token
 * @param {Number} circleId Circle Id
 * @param {String} startOn Start datetime (yyyy-MM-dd HH:MM:SS)
 * @param {String} endOn End datetime (yyyy-MM-dd HH:MM:SS)
 */
export const loadEvents = (token, circleId, startOn, endOn) => {
  return (dispatch) => {
    bivtURL
      .get('/plugin/event/list', {
        headers: {Authorization: `Bearer ${token}`},
        params: {circleId, startOn, endOn},
      })
      .then((response) => {
        if (response.status === 200) {
          return response.data.data;
        } else {
          throw new Error('An error occurred. Please try again later');
        }
      })
      .then((events) => {
        console.log(events);
        dispatch(eventListLoaded(events));
      })
      .catch((error) => {
        if (error.response) {
          if (error.response.status === 404) {
            dispatch(eventListLoaded(null));
          }
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          dispatch(errorOccurred(error.response.data.status.errors[0]));
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
          // http.ClientRequest in node.js
          dispatch(errorOccurred('An error occurred. Please try again later'));
        } else {
          // Something happened in setting up the request that triggered an Error
          dispatch(errorOccurred(error.message));
        }
      });
  };
};
