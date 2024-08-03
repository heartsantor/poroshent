const { format, parseISO } = require('date-fns');

function formatDateAndTime(dateString) {
  const date = parseISO(dateString);

  // Format date with custom hours and am/pm uppercase
  const formattedDate = format(date, 'd MMMM yyyy (hh:mm a)');
  const [datePart, timePart] = formattedDate.split('(');
  const [time, ampm] = timePart.split(' ');

  return `${datePart.trim()} (${time} ${ampm.toUpperCase()})`;
}

function formatDateOnly(dateString) {
  const date = parseISO(dateString);
  return format(date, 'd MMMM yyyy');
}

function formatTimeOnly(dateString) {
  const date = parseISO(dateString);
  return format(date, 'hh:mm a').toUpperCase();
}

function formatDayOnly(dateString) {
  const date = parseISO(dateString);
  return format(date, 'EEEE');
}

export { formatDateAndTime, formatDateOnly, formatTimeOnly, formatDayOnly };
