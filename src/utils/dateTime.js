import { format, parseISO } from 'date-fns';


const convertToBengaliDigits = (number) => {
  if (number === undefined || number === null) {
    return '';
  }

  const englishToBengali = {
    0: '০',
    1: '১',
    2: '২',
    3: '৩',
    4: '৪',
    5: '৫',
    6: '৬',
    7: '৭',
    8: '৮',
    9: '৯'
  };

  return number
    .toString()
    .split('')
    .map((digit) => englishToBengali[digit] || digit)
    .join('');
};

// Bengali month names
const bengaliMonths = [
  'জানুয়ারি',
  'ফেব্রুয়ারি',
  'মার্চ',
  'এপ্রিল',
  'মে',
  'জুন',
  'জুলাই',
  'আগস্ট',
  'সেপ্টেম্বর',
  'অক্টোবর',
  'নভেম্বর',
  'ডিসেম্বর'
];

export const formatDateBangla = (dateString) => {
  console.log('🚀 ~ formatDateBangla ~ dateString:', dateString);

  if (!dateString) {
    return '';
  }

  const date = parseISO(dateString);

  if (isNaN(date)) {
    return ''; // Return empty if dateString is invalid
  }

  // Extract day, month, and year
  const day = convertToBengaliDigits(format(date, 'd'));
  const month = bengaliMonths[date.getMonth()];
  const year = convertToBengaliDigits(format(date, 'yyyy'));

  return `${day} ${month} ${year}`;
};

export const formatDateAndTime = (dateString) => {
  const date = parseISO(dateString);

  // Format date with custom hours and am/pm uppercase
  const formattedDate = format(date, 'd MMMM yyyy (hh:mm a)');
  const [datePart, timePart] = formattedDate.split('(');
  const [time, ampm] = timePart.split(' ');

  return `${datePart.trim()} (${time} ${ampm.toUpperCase()}`;
};

export const formatDateOnly = (dateString) => {
  console.log('🚀 ~ formatDateOnly ~ dateString:', dateString);
  const date = parseISO(dateString);
  return dateString ?? format(date, 'd MMMM yyyy');
};

export const formatTimeOnly = (dateString) => {
  const date = parseISO(dateString);
  return format(date, 'hh:mm a').toUpperCase();
};

export const formatDayOnly = (dateString) => {
  const date = parseISO(dateString);
  return format(date, 'EEEE');
};

