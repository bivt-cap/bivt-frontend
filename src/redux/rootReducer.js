import {combineReducers} from 'redux';
import signupReducer from './authentication/signup/signupReducer';
import loginReducer from './authentication/login/loginReducer';
import createCirlceReducer from './circle/createCircle/createCirlceReducer';
import inviteToCirlceReducer from './circle/inviteToCircle/inviteToCirlceReducer';

const rootReducer = combineReducers({
  signup: signupReducer,
  login: loginReducer,
  forgotPassword: loginReducer,
  createCircle: createCirlceReducer,
  inviteToCircle: inviteToCirlceReducer,
});

export default rootReducer;
