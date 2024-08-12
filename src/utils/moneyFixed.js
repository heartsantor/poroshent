export const moneyFixed = (amount) => {
  let parsedAmount;

  // Handle if amount is a string
  if (typeof amount === 'string') {
    parsedAmount = parseFloat(amount);
  } else {
    parsedAmount = parseFloat(amount);
  }

  // Validate if parsedAmount is a number
  if (isNaN(parsedAmount)) {
    return 'Invalid amount';
  }

  // Return the amount formatted with commas and two decimal places
  return parsedAmount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
};
