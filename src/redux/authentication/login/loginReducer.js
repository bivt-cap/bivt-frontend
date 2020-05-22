'./signupTypes';

const loginInitial = {
  loading: false,
  loginDetails: '',
  googleLoginDetails: '',
  isLoggedin: 'False',
  googleisLoggedin: 'False',
  forgotPasswordDetails: '',
  error: '',
};

//Reducer: is a function that is responsible for taking in an action and some existing amount of data
//its going to process that action and then make some changes to the data and return it
let loginReducer = (state = loginInitial, action) => {
  switch (action.type) {
    case 'LOGIN_REQUEST':
      return {
        ...state,
        loading: true,
      };
    case 'LOGIN_SUCCESS':
      return {
        loading: false,
        loginDetails: action.payload,
        isLoggedin: 'True',
        error: '',
      };
    case 'GOOGLE_LOGIN_SUCCESS':
      return {
        loading: false,
        googleLoginDetails: action.payload,
        googleisLoggedin: 'True',
        error: '',
      };
    case 'FORGOT_PASSWORD_SUCCESS':
      return {
        loading: false,
        error: '',
        emailSent: 'True',
        forgotPasswordDetails: action.payload,
      };
    case 'FORGOT_PASSWORD_FAIL':
      return {
        loading: false,
        emailSent: 'False',
        error: action.payload,
        pwErrorStatus: 'True',
      };
    case 'LOGIN_FAIL':
      return {
        loading: false,
        loginDetails: '',
        error: action.payload,
        errorStatus: 'True',
      };
    case 'RESET_ERROR_MSG':
      return state;
    default:
      return state;
  }
};

export default loginReducer;
