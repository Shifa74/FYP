

const customHolidays = [
  { date: "02-05", name: "Kashmir Day", type: "public" },
  { date: "03-23", name: "Pakistan Day", type: "public" },
  { date: "05-01", name: "Labour Day", type: "public" },
  { date: "08-14", name: "Independence Day", type: "public" },
  { date: "12-25", name: "Quaid-e-Azam Day", type: "public" },
];

// const islamicHolidays = [
//   { hijriDate: "01-09", name: "Ashura" },
//   { hijriDate: "01-10", name: "Ashura" },
//   { hijriDate: "03-12", name: "Eid Milad un Nabi" },
//   { hijriDate: "10-01", name: "Eid ul-Fitr Day 1" },
//   { hijriDate: "10-02", name: "Eid ul-Fitr Day 2" },
//   { hijriDate: "10-03", name: "Eid ul-Fitr Day 3" },
//   { hijriDate: "12-10", name: "Eid ul-Adha Day 1" },
//   { hijriDate: "12-11", name: "Eid ul-Adha Day 2" },
//   { hijriDate: "12-12", name: "Eid ul-Adha Day 3 " },
// ];

const getCustomHolidays = (year) => {
  //convert custom hoidays to date objects
  return customHolidays.map((holiday) => {
    const [month, day] = holiday.date.split("-").map(Number);
    return new Date(year, month - 1, day);
  });
};

// const getIslamicHolidays = (year) => {
//   // Convert the first day of the Gregorian year to Hijri
//   const firstDayHijri = toHijri(year, 1, 1);

//   // Use the Hijri year that corresponds to the Gregorian year start
//   const hijriYear = firstDayHijri.hy;

//   // Now, map the Islamic holidays for that Hijri year
//   return islamicHolidays.map((holiday) => {
//     const [hijriMonth, hijriDay] = holiday.hijriDate.split("-").map(Number);
//     const gregorianDate = toGregorian(hijriYear, hijriMonth, hijriDay); // Convert Hijri to Gregorian
//     return new Date(gregorianDate.gy, gregorianDate.gm - 1, gregorianDate.gd);
//   });
// };





// console.log("Custom Holidays:", getCustomHolidays(2024));
// console.log("Islamic Holidays:", getIslamicHolidays(2024));




module.exports = { getCustomHolidays };
