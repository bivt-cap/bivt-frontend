import {combineReducers} from 'redux';
import signupReducer from './authentication/signup/signupReducer';

const rootReducer = combineReducers({
  signup: signupReducer,
});

export default rootReducer;
