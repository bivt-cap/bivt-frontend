'./signupTypes';

const loginInitial = {
  loading: false,
  loginDetails: '',
  error: '',
  isLoggedin: 'False',
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
        // loginDetails: action.payload,
        googleLoginDetails: action.payload,
        googleisLoggedin: 'True',
        error: '',
      };
    case 'LOGIN_FAIL':
      return {
        loading: false,
        loginDetails: '',
        error: action.payload,
      };
    default:
      return state;
  }
};

export default loginReducer;
