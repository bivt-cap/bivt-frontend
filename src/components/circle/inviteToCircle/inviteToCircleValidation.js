/**
 * Invite to circle form validation
 *
 * @version 0.0.1
 * @author Arshdeep Singh (https://github.com/Singh-Arshdeep)
 */
import {EMAIL_REGEX} from '../../../utils/regexUtil';

export async function inviteToCircleValidation(inviteToCircleDetails) {
  const validationErrors = {
    inviteeEmail: {
      error: false,
    },
  };
  if (inviteToCircleDetails.inviteeEmail.length < 1) {
    validationErrors.inviteeEmail = {
      error: true,
      message: 'Please enter an email address',
    };
  } else {
    const emailReg = EMAIL_REGEX;
    if (
      !emailReg.test(String(inviteToCircleDetails.inviteeEmail).toLowerCase())
    ) {
      validationErrors.inviteeEmail = {
        error: true,
        message: 'Please enter a valid email address',
      };
    }
  }
  return validationErrors;
}
