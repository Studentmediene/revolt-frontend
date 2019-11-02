import React from 'react';
import moment from 'moment';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import SendePlanRow from '../SendeplanRow';
import { getDayTitle, isSameDay, isBetween } from '../../utils';

import styles from './styles.scss';

const makeShows = (showStart, date) => {
  if (Object.entries(showStart).length === 0) {
    return (
      <div key="notAvailable" className={styles.notAvailable}>
        Ikke tilgjengelig
      </div>
    );
  }
  const showTable = [];
  const today = moment();
  const isToday = isSameDay(today, date);
  let lastShowName = 'Nattmusikk';
  let currentHour = moment().hour();

  for (let hour = 7; hour < 24; hour++) {
    const isNow = isToday && isBetween(currentHour, hour, hour + 1);

    if (showStart[hour]) {
      let r = '(R)';
      lastShowName = showStart[hour];
      let isRerun = lastShowName.includes(r);
      if (!isRerun) {
        lastShowName = <b>{lastShowName}</b>;
      }
    }
    showTable.push(
      <SendePlanRow
        key={hour}
        hour={hour}
        isActive={isNow}
        showName={lastShowName}
      />,
    );
  }
  return showTable;
};

const makeShowStarts = shows => {
  const showStarts = {};
  if (!shows) {
    return showStarts;
  }
  shows
    .valueSeq()
    .forEach(
      show =>
        (showStarts[
          moment(show.get('starttime'), 'YYYY-MM-DD HH:mm:ss').hour()
        ] = show.get('title')),
    );
  return showStarts;
};

const SendeplanTable = ({ day, shows, hideOnSmallScreen }) => {
  const showStarts = makeShowStarts(shows);
  return (
    <div
      className={classNames(styles.day, {
        [styles.hideOnSmallScreen]: hideOnSmallScreen,
      })}
    >
      <div>
        <div className={styles.date}>{getDayTitle(day)}</div>
        {makeShows(showStarts, day)}
      </div>
    </div>
  );
};
SendeplanTable.propTypes = {
  day: PropTypes.object.isRequired,
  shows: PropTypes.object.isRequired,
  hideOnSmallScreen: PropTypes.bool,
};

export default SendeplanTable;
