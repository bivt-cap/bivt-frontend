/**
 * Bootstrap reducer
 *
 * @version 0.0.1
 * @author Eduardo Pereira do Carmo (https://github.com/eduardopcarmo)
 */

// Types
import {EVENT_ERROR, EVENT_INSERT, EVENT_GET_LIST} from './calendarTypes';

// Initial State
const calendarInitialState = {
  isLoading: false,
  isError: false,
  error: null,
  events: [],
  eventId: null,
  members: null,
  photos: null,
};

// Reducer
const calendarReducer = (state = calendarInitialState, action) => {
  // Type
  switch (action.type) {
    case EVENT_ERROR:
      return {
        ...state,
        isLoading: false,
        isError: true,
        error: action.payload,
      };
    case EVENT_INSERT:
      return {
        ...state,
        isLoading: false,
        eventId: action.payload,
      };
    case EVENT_GET_LIST:
      return {
        ...state,
        isLoading: false,
        isError: false,
        error: null,
        events: action.payload,
        eventId: null,
        members: null,
        photos: null,
      };
  }

  // No action defined
  return state;
};

// Export
export default calendarReducer;
