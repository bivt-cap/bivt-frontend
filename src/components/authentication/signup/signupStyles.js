/**
 * Signup styles
 *
 * @version 0.0.1
 * @author Arshdeep Singh (https://github.com/Singh-Arshdeep)
 */

import {StyleSheet} from 'react-native';

const signupStyles = StyleSheet.create({
  headerLeft: {
    flex: 1,
  },
  headerBody: {
    flex: 1,
    backgroundColor: 'red',
  },
  headerBodytitle: {
    alignSelf: 'center',
  },
  headerright: {
    flex: 1,
  },
  signupForm: {
    marginTop: '10%',
  },
  signupButton: {
    marginTop: '10%',
  },
  loginButton: {
    marginTop: '10%',
  },
  textFieldError: {
    color: 'red',
    fontSize: 14,
  },
});

export default signupStyles;
