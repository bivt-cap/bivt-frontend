/**
 * Login Page Style
 *
 * @version 0.0.1
 * @author Yalcin Tatar (https://github.com/yalcinos)
 */
import {StyleSheet, Dimensions} from 'react-native';

const styles = StyleSheet.create({
  forgotPasswordBtn: {
    marginBottom: 15,
    flex: 1,
    justifyContent: 'flex-end',
  },
  forgotPasswordText: {
    textTransform: 'capitalize',
    textDecorationLine: 'underline',
  },
  Or: {
    marginTop: 15,
    textAlign: 'center',
  },
  GoogleSigninButton: {
    marginTop: 15,
    width: Dimensions.get('window').width,
    marginBottom: 15,
  },
  forgotResendBtn: {
    marginBottom: 15,
    flex: 1,
    justifyContent: 'center',
  },
  forgotResendText: {
    textTransform: 'capitalize',
    textDecorationLine: 'underline',
  },
});

export default styles;
