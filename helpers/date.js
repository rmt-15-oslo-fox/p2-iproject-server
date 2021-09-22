function date(value) {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let month = months[value.getMonth()];
  let date = value.getDate();
  let convertedDate = "";
  if (date > 10 && date < 20) {
    convertedDate = `${date}th`;
  } else if (date % 10 === 1) {
    convertedDate = `${date}st`;
  } else if (date % 10 === 2) {
    convertedDate = `${date}nd`;
  } else if (date % 10 === 3) {
    convertedDate = `${date}rd`;
  } else {
    convertedDate = `${date}th`;
  }
  return `${convertedDate} ${month} ${value.getFullYear()}`;
}

module.exports = date;
