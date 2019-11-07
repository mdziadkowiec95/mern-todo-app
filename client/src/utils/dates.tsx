export const isValidDate = (input: any) => {
  if (Object.prototype.toString.call(input) === '[object Date]') return true;
  return false;
};

// TODO --- localization feature in the future
// By now I assume there is only 24 horus timeFormat possible.
// In the future it's going to change as there will be localication implemented.
export const isTwelweHoursCountry = (countryCode?: string) => {
  if (countryCode) {
    // 1. Check whether provided country uses 12 or 24 hours time format
    // 2. Return TRUE if it will be 12 hours
  }
  return false;
};
