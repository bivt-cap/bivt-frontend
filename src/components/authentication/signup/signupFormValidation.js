/**
 * Signup form validation
 *
 * @version 0.0.1
 * @author Arshdeep Singh (https://github.com/Singh-Arshdeep)
 */

import {EMAIL_REGEX, PASSWORD_REGEX} from '../../../utils/regexUtil';

export async function signupFormValidation(userSignupDetails) {
  const validationErrors = {
    firstName: {
      error: false,
    },
    lastName: {
      error: false,
    },
    eMail: {
      error: false,
    },
    password: {
      error: false,
    },
    coPassword: {
      error: false,
    },
    firstRender: false,
  };

  if (userSignupDetails.firstName.length < 1) {
    validationErrors.firstName = {
      error: true,
      message: 'Please enter a first name',
    };
  }
  if (userSignupDetails.lastName.length < 1) {
    validationErrors.lastName = {
      error: true,
      message: 'Please enter a Last name',
    };
  }
  if (userSignupDetails.eMail.length < 1) {
    validationErrors.eMail = {
      error: true,
      message: 'Please enter an email address',
    };
  } else {
    const emailReg = EMAIL_REGEX;
    if (!emailReg.test(String(userSignupDetails.eMail).toLowerCase())) {
      validationErrors.eMail = {
        error: true,
        message: 'Please enter a valid email address',
      };
    }
  }
  if (userSignupDetails.password.length < 1) {
    validationErrors.password = {
      error: true,
      message: 'Please enter a password',
    };
  } else {
    const passwordRegex = PASSWORD_REGEX;
    if (!passwordRegex.test(String(userSignupDetails.password))) {
      validationErrors.password = {
        error: true,
        message:
          'Enter min eight characters, at least one uppercase letter, one lowercase letter, one number and one special character',
      };
    }
  }
  if (userSignupDetails.coPassword.length < 1) {
    validationErrors.coPassword = {
      error: true,
      message: 'Please retype your password',
    };
  } else if (userSignupDetails.password !== userSignupDetails.coPassword) {
    validationErrors.coPassword = {
      error: true,
      message: 'Password and Confirm password does not match',
    };
  }
  return validationErrors;
}
