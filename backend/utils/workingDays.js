const { eachDayOfInterval, isWeekend} = require("date-fns");
const { getCustomHolidays, getIslamicHolidays } = require("./holidays");

const getWorkingDays = (month, year) => {
  const daysInMonth = eachDayOfInterval({
    start: new Date(year, month - 1, 1),
    end: new Date(year, month, 0),
  });
 
  const customHolidays = getCustomHolidays(year);
  // const islamicHolidays = getIslamicHolidays(year);
  // console.log("Islamic Holidays:", islamicHolidays);

  let workingDays = daysInMonth.filter((day) => !isWeekend(day));
  // console.log("After excluding weekends:", workingDays.length);
  workingDays = workingDays.filter((day) => {
    return (
      !customHolidays.some((holiday) => holiday.getTime() === day.getTime()) 
      // !islamicHolidays.some((holiday) => holiday.getTime() === day.getTime())
    );
  });
  // console.log(`working days from workingDays.js ${month}`, workingDays.length)
  return workingDays.length;
};

module.exports = { getWorkingDays };
