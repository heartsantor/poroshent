export const convertToBanglaNumber = (num) => {
  // Check if num is undefined, null, or NaN
  if (num === undefined || num === null || isNaN(num)) {
    return ''; // Return an empty string if num is not valid
  }

  const banglaNumbers = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];

  return num
    .toString()
    .split('')
    .map((digit) => banglaNumbers[digit] || digit)
    .join('');
};