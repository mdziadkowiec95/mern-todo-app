const day = 24 * 60 * 60 * 1000;
const hour = 60 * 60 * 1000;

const calcTime = {
  getHours(h) {
    return h * hour;
  },
  getDays(d) {
    return d * day;
  },
  getDaysWithHours(d, h) {
    return d * day + h * hours;
  }
};

module.exports = calcTime;
