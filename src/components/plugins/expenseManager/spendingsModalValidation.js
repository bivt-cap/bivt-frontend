/**
 * Spending Modal validation
 *
 * @version 0.0.1
 * @author Arshdeep Singh (https://github.com/Singh-Arshdeep)
 */

export async function spendingsModalValidation(billDetails) {
  const validationErrors = {
    billName: {
      error: false,
    },
    billAmount: {
      error: false,
    },
  };
  if (billDetails.billName.length < 3 || billDetails.billName.length > 56) {
    validationErrors.billName = {
      error: true,
      message:
        'The bill name must have a minimum of 3 characters and a maximum of 56 characters',
    };
  }
  //Fix to accept only numbers
  if (
    typeof parseFloat(billDetails.billAmount) !== 'number' ||
    billDetails.billAmount < 0
  ) {
    validationErrors.billAmount = {
      error: true,
      message: 'Please enter a valid amount (CAD $)',
    };
  }
  return validationErrors;
}
