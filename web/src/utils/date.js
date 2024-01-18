
export const dateToTimezonedString = (date) => {
  const d = new Date(date + "Z");
  let userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  let options = { timeZone: userTimeZone, year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
  return d.toLocaleString('en-GB', options);
}

export const dateToDayString = (date) => {
  return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${(date.getDate() + 1).toString().padStart(2, '0')}`;
}

export const dateToMonthString = (date) => {
  return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}`;
}

export const unixTimestampToDayString = (unixTimestamp) => {
  const date = new Date(unixTimestamp);
  return dateToDayString(date);
}

export const unixTimestampToMonthString = (unixTimestamp) => {
  const date = new Date(unixTimestamp);
  return dateToMonthString(date);
}

