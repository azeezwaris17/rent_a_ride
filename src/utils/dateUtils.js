const { DateTime } = require("luxon");

// Format a date to a specific format
const formatDate = (date, format = "yyyy-MM-dd") => {
  return DateTime.fromJSDate(date).toFormat(format);
};

// Get the difference in days between two dates
const getDateDifferenceInDays = (date1, date2) => {
  const diff = DateTime.fromJSDate(date1).diff(
    DateTime.fromJSDate(date2),
    "days"
  );
  return diff.days;
};

// Check if a date is in the past
const isPastDate = (date) => {
  return DateTime.fromJSDate(date) < DateTime.now();
};

module.exports = {
  formatDate,
  getDateDifferenceInDays,
  isPastDate,
};
