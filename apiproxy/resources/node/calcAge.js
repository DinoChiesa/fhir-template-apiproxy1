// calcAge.js
// ------------------------------------------------------------------
//
// Description goes here....
//
// created: Wed Apr 22 12:47:26 2015
// last saved: <2015-April-22 13:02:02>

var re1 = new RegExp("\\d{4}-\\d{2}-\\d{2}");
var re2 = new RegExp("(\\d{4})-([A-Ya-y]{3,})-(\\d{2})");
var months = ['January', 'February', 'March', 'April', 'May', 'June',
             'July', 'August', 'September', 'October', 'November', 'December'];

function normalizeDate(input) {
  var dob = '';

  if (re1.test(input)) {
    return input;
  }
  if (!re2.test(input)) {
    return dob;
  }

  var match = re2.exec(input);
  // check for 3-letter abbrev
  var x = months.map(function(item){return item.substring(0, 3).toLowerCase();})
    .indexOf(match[2].toLowerCase());
  if (x > -1) {
    // normalize input dob
    dob = match[1] + '-' + (x + 1) + '-' + match[3];
    return dob;
  }


  x = months.map(function(item){return item.toLowerCase();})
    .indexOf(match[2].toLowerCase());
  if (x > -1) {
    // normalize input dob
    dob = match[1] + '-' + (x + 1) + '-' + match[3];
    return dob;
  }

  return dob;

}

function calcAge(dob) {
  var today = new Date(), yr1, yr2, month1, month2, day1, day2, yrs, age;

  dob = normalizeDate(dob);
  if (dob === '') { return 'unknown';}

  dob = dob.split("-");
  yr1 = parseInt(dob[0], 10);
  month1 = parseInt(dob[1],10)-1;
  day1 = parseInt(dob[2],10);

  yr2 = today.getFullYear();
  month2 = today.getMonth();
  day2 = today.getDate();
  if (yr1 > yr2) {
    return "invalid date";
  }
  if (month1 <0 || month1 > 11) {
    return "invalid date";
  }
  if (yr1 == yr2 && month1>month2) {
    return "invalid date";
  }
  if (day1 <1 || day1 > daysInMonth(month1+1,yr1)) {
    return "invalid date";
  }
  yrs = yr2 - yr1;

  // next birthday not yet reached
  if (month1 > month2) {yrs--;}
  else if (month1 == month2 && day2 < day1) {yrs--;}

  age = yrs + " years";
  if (month1 < month2) {
    age += " " + (month2 - month1) + " months";
  }
  if (month1 > month2) {
    age += " " + (12 - (month1 - month2)) + " months";
  }
  else if (month1 == month2) {
    if (day2 < day1) {
      age += " " + (12 - (month1 - month2) -1) + " months " +
        (day1 - day2) +" days";
    }
  }
  return age;
}

function daysInMonth(month,year) {  // months are 1-12
  var dd = new Date(year, month, 0);
  return dd.getDate();
}


module.exports = calcAge;
