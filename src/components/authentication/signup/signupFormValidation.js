export function signupFormValidation(userSignupDetails) {
  const validationInfo = {
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
    validationInfo.firstName = {
      error: true,
      message: 'Please enter a first name',
    };
  }
  if (userSignupDetails.lastName.length < 1) {
    validationInfo.lastName = {
      error: true,
      message: 'Please enter a Last name',
    };
  }
  if (userSignupDetails.eMail.length < 1) {
    validationInfo.eMail = {
      error: true,
      message: 'Please enter an email address',
    };
  } else {
    const emailReg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!emailReg.test(String(userSignupDetails.eMail).toLowerCase())) {
      validationInfo.eMail = {
        error: true,
        message: 'Please enter a valid email address',
      };
    }
  }
  if (userSignupDetails.password.length < 1) {
    validationInfo.password = {
      error: true,
      message: 'Please enter a password',
    };
  } else {
    const passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
    if (!passwordRegex.test(String(userSignupDetails.password))) {
      validationInfo.password = {
        error: true,
        message:
          'Enter min eight characters, at least one uppercase letter, one lowercase letter, one number and one special character',
      };
    }
  }
  if (userSignupDetails.coPassword.length < 1) {
    validationInfo.coPassword = {
      error: true,
      message: 'Please retype your password',
    };
  } else if (userSignupDetails.password !== userSignupDetails.coPassword) {
    validationInfo.coPassword = {
      error: true,
      message: 'Password and Confirm password does not match',
    };
  }
  if (Object.keys(validationInfo).length === 0) {
    return false;
  } else {
    return validationInfo;
  }
}

// Email regex reference
// https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript

// Password regex reference
// https://stackoverflow.com/questions/19605150/regex-for-password-must-contain-at-least-eight-characters-at-least-one-number-a
