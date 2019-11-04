import moment from 'moment';

export const initMoment = () => {
  // Set global locales for moment
  moment.updateLocale('NB_no', {
    calendar: {
      lastDay: '[I går] HH:mm',
      sameDay: '[I dag] HH:mm',
      nextDay: '[I morgen] HH:mm',
      sameElse: 'DD.MM.YY HH:mm',
    },
    weekdaysShort: 'man_tirs_ons_tors_fre_lør_søn'.split('_'),
    weekdays: 'mandag_tirsdag_onsdag_torsdag_fredag_lørdag_søndag'.split('_'),
  });
};

export const getNormalizedDateString = dateString => {
  const paddedString = i => (i < 10 ? `0${i}` : `${i}`);

  const date = moment(dateString);
  const year = date.year();
  const month = date.month() + 1;
  const day = date.date();

  return `${paddedString(day)}.${paddedString(month)}.${year}`;
};
