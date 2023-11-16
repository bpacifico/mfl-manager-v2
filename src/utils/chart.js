import { dateToMonthString } from "utils/date.js";

export const sortDataset = (dataset) => {
  return Object.keys(dataset)
    .sort()
    .reduce((accumulator, key) => {
      accumulator[key] = dataset[key];
      return accumulator;
    }, {});
}


export const fillMonthlyDataset = (dataset) => {
  const minMonth = Object.keys(dataset).sort((a, b) => b.localeCompare(a)).pop();
  const maxMonth = Object.keys(dataset).sort((a, b) => a.localeCompare(b)).pop();

  if (minMonth && maxMonth) {
    const minDate = new Date(minMonth);
    const maxDate = new Date(maxMonth);

    let date = minDate;

    while (date < maxDate) {
      let month = dateToMonthString(date);

      if (!dataset[month]) {
        dataset[month] = 0;
      }

      date.setMonth(date.getMonth() + 1);
    }
  }

  return dataset;
};
