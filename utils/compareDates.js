module.exports = compareDates = {
  isPastDate: date => {
    const targetDate = new Date(date);
    return targetDate < new Date();
  }
};
