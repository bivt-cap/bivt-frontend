import {combineReducers} from 'redux';
import signupReducer from './authentication/signup/signupReducer';
import loginReducer from './authentication/login/loginReducer';
import createCirlceReducer from './circle/createCircle/createCirlceReducer';

const rootReducer = combineReducers({
  signup: signupReducer,
  login: loginReducer,
  createCircle: createCirlceReducer,
});

export default rootReducer;
