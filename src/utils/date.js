
export const dateToMonthString = (date) => {
  return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}`
}

export const unixTimestampToMonthString = (unixTimestamp) => {
  const date = new Date(unixTimestamp);
  return dateToMonthString(date);
}