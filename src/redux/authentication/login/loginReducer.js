'./signupTypes';

const loginInitial = {
  loading: false,
  loginDetails: '',
  error: '',
  isLoggedin: 'False',
};

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
