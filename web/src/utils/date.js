
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

