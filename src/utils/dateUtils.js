import moment from 'moment';

export const getNormalizedDateString = dateString => {
  const paddedString = i => (i < 10 ? `0${i}` : `${i}`);

  const date = moment(dateString);
  const year = date.year();
  const month = date.month() + 1;
  const day = date.date();

  return `${paddedString(day)}.${paddedString(month)}.${year}`;
};
