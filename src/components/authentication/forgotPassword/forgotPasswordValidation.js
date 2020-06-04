export function forgotPasswordValidation(userLoginDetails) {
  const validationInfo = {
    email: {
      error: false,
    },
    firstRender: false,
  };

  if (userLoginDetails.email.length < 1) {
    validationInfo.email = {
      error: true,
      message: 'Please enter an email address',
    };
  } else {
    const emailReg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!emailReg.test(String(userLoginDetails.email).toLowerCase())) {
      validationInfo.email = {
        error: true,
        message: 'Please enter a valid email address',
      };
    }
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
