/**
 * Budget Modal validation
 *
 * @version 0.0.1
 * @author Arshdeep Singh (https://github.com/Singh-Arshdeep)
 */

export async function budgetModalValidation(budgetDetails) {
  const validationErrors = {
    budgetName: {
      error: false,
    },
    budgetAmount: {
      error: false,
    },
    budgetDate: {
      error: false,
    },
  };
  if (
    budgetDetails.budgetName.length < 3 ||
    budgetDetails.budgetName.length > 56
  ) {
    validationErrors.budgetName = {
      error: true,
      message:
        'The budget name must have a minimum of 3 characters and a maximum of 56 characters',
    };
  }
  if (
    typeof parseFloat(budgetDetails.budgetAmount) !== 'number' ||
    budgetDetails.budgetAmount <= 0
  ) {
    validationErrors.budgetAmount = {
      error: true,
      message: 'Please enter a valid amount (CAD $)',
    };
  }
  if (budgetDetails.budgetFrom > budgetDetails.budgetTo) {
    validationErrors.budgetDate = {
      error: true,
      message: 'Select valid dates',
    };
  }
  return validationErrors;
}
