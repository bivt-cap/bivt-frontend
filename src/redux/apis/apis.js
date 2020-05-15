import axios from 'axios';

//Login
export const loginBaseURL = axios.create({
  baseURL: 'http://192.168.1.120:3500',
});
// Sign Up
const signUpUrl = 'http://192.168.0.10:3500/user/create';

export {signUpUrl};
