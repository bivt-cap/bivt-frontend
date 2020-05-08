import {combineReducers} from 'redux';
import signupReducer from './authentication/signup/signupReducer';
import loginReducer from './authentication/login/loginReducer';

const rootReducer = combineReducers({
  signup: signupReducer,
  login: loginReducer,
});

export default rootReducer;
