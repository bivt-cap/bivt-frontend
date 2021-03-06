import {combineReducers} from 'redux';
import bootstrapReducer from './authentication/bootstrap/bootstrapRedurer';
import signupReducer from './authentication/signup/signupReducer';
import loginReducer from './authentication/login/loginReducer';
import createCirlceReducer from './circle/createCircle/createCirlceReducer';
import inviteToCirlceReducer from './circle/inviteToCircle/inviteToCirlceReducer';
import choosePluginReducer from './managePlugin/choosePlugin/choosePluginReducer';
import userLocationTrack from './plugins/trackUser/trackUserReducer';
import expenseManagerReducer from './plugins/expenseManager/expenseManagerReducer';
import calendarReducer from './plugins/calendar/calendarReducer';
import todoListReducer from './plugins/todoList/todoListReducer';
import pollingReducer from './plugins/polling/pollingReducer';

const rootReducer = combineReducers({
  bootstrap: bootstrapReducer,
  signup: signupReducer,
  login: loginReducer,
  forgotPassword: loginReducer,
  createCircle: createCirlceReducer,
  inviteToCircle: inviteToCirlceReducer,
  locationTrack: userLocationTrack,
  choosePlugin: choosePluginReducer,
  expenseManager: expenseManagerReducer,
  calendarReducer: calendarReducer,
  todoList: todoListReducer,
  pollInfo: pollingReducer,
});

export default rootReducer;
