import { format, parseISO } from 'date-fns';

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
