/**
 * Create Circle form validation
 *
 * @version 0.0.1
 * @author Arshdeep Singh (https://github.com/Singh-Arshdeep)
 */

export async function createCircleValidation(createCircleDetails) {
  const validationErrors = {
    groupName: {
      error: false,
    },
  };
  if (
    createCircleDetails.groupName.length < 3 ||
    createCircleDetails.groupName.length > 56
  ) {
    validationErrors.groupName = {
      error: true,
      message:
        'The Group name must have a minimum of 3 characters and a maximum of 56 characters',
    };
  }
  return validationErrors;
}
