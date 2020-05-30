/**
 * Create Circle form validation
 *
 * @version 0.0.1
 * @author Arshdeep Singh (https://github.com/Singh-Arshdeep)
 */

export async function createCircleValidation(createCircleDetails) {
  const validationErrors = {
    circleName: {
      error: false,
    },
    selectedCircleType: {
      error: false,
    },
  };
  if (
    createCircleDetails.circleName.length < 3 ||
    createCircleDetails.circleName.length > 56
  ) {
    validationErrors.circleName = {
      error: true,
      message:
        'The Circle name must have a minimum of 3 characters and a maximum of 56 characters',
    };
  }
  if (
    createCircleDetails.selectedCircleType <= 0 ||
    createCircleDetails.selectedCircleType > 5
  ) {
    validationErrors.selectedCircleType = {
      error: true,
      message: 'Please select the type of circle you would like to create',
    };
  }
  return validationErrors;
}
