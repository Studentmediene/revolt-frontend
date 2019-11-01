import moment from 'moment';

export const timestampKey = (year, month, date) => `${year}.${month}.${date}`;

export const getDayTitle = date => {
  const today = moment();
  const tomorrow = moment().add(1, 'days');
  if (isSameDay(today, date)) {
    return 'I dag';
  } else if (isSameDay(tomorrow, date)) {
    return 'I morgen';
  } else {
    return date.format('DD.MM.YYYY');
  }
};

export const isSameDay = (day1, day2) =>
  day1.isSame(day2, 'year') &&
  day1.isSame(day2, 'month') &&
  day1.isSame(day2, 'day');

export const isNow = timestamp => {
  const now = moment();
  return (
    isSameDay(now, timestamp) &&
    isBetween(timestamp, now.hour(), now.hour() + 1)
  );
};

export const isBetween = (current, lowerLimit, upperLimit) =>
  lowerLimit <= current && current < upperLimit;
