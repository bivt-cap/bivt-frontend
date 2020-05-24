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
    selectedGroupType: {
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
  if (
    createCircleDetails.selectedGroupType <= 0 ||
    createCircleDetails.selectedGroupType > 5
  ) {
    validationErrors.selectedGroupType = {
      error: true,
      message: 'Please select the type of group you would like to create',
    };
  }
  return validationErrors;
}
