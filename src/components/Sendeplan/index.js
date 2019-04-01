/*
 *
 * Sendeplan
 *
 */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import moment from 'moment';
import classNames from 'classnames';
import {
  selectSendeplan,
  selectSendeplanLoading,
  selectSendeplanError,
} from './selectors';
import { loadSendeplan } from './actions';

import Loader from 'components/Loader';

import styles from './styles.scss';

export class Sendeplan extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showAll: false,
    };
  }

  componentDidMount() {
    const today = moment();
    this.props.loadSendeplanDay(
      today.year(),
      today.month(),
      today.date(),
      moment.weekdays(today.day()),
    );

    const tomorrow = today.add(1, 'days');
    this.props.loadSendeplanDay(
      tomorrow.year(),
      tomorrow.month(),
      tomorrow.date(),
      moment.weekdays(tomorrow.day()),
    );
  }

  makeSendePlanDay(showStart, isToday) {
    const showTable = [];
    let lastShowName = 'Nattmusikk';
    let currentHour = moment().hour();
    showTable.push(<div className={styles.headerCell}>Program</div>);
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
        <div
          className={classNames(styles.tableCell, {
            [styles.activeNow]: isNow,
          })}
        >
          {lastShowName}
        </div>,
      );
    }
    return showTable;
  }
  makeShowStarts(sendeplanDay) {
    const showStarts = {};
    for (let show of sendeplanDay) {
      showStarts[moment(show.starttime).hour()] = show.title;
    }
    return showStarts;
  }

  makeTimeTableDay(date, isToday) {
    const timeTable = [];
    let currentHour = moment().hour();
    timeTable.push(<div className={styles.headerCell}>Tid</div>);
    for (let hour = 7; hour < 24; hour++) {
      const isNow = isToday && isBetween(currentHour, hour, hour + 1);
      const hourString = String(hour).padStart(2, '0');
      const time = (
        <div
          className={classNames(styles.tableCell, {
            [styles.activeNow]: isNow,
          })}
        >
          {hourString}:00
        </div>
      );
      timeTable.push(time);
    }
    return timeTable;
  }

  render() {
    // Creates an array of all time-stamps for the table.
    const firstDayTimeTable = this.makeTimeTableDay(moment(), true);
    const secondDayTimeTable = this.makeTimeTableDay(
      moment().add(1, 'days'),
      false,
    );
    const firstDayShowStarts = this.makeShowStarts(
      this.props.sendeplan[moment.weekdays(moment().day())],
    );
    const secondDayShowStarts = this.makeShowStarts(
      this.props.sendeplan[
        moment.weekdays(
          moment()
            .add(1, 'days')
            .day(),
        )
      ],
    );
    const firstDayShows = this.makeSendePlanDay(firstDayShowStarts, true);
    const secondDayShows = this.makeSendePlanDay(secondDayShowStarts, false);

    return (
      <div className={styles.wrapper}>
        <div className={styles.timeTable}>{firstDayTimeTable}</div>
        <div className={styles.titles}>{firstDayShows}</div>
        <div className={styles.timeTable}>{secondDayTimeTable}</div>
        <div className={styles.titles}>{secondDayShows}</div>
      </div>
    );
  }
}

Sendeplan.propTypes = {
  loadSendeplanDay: PropTypes.func.isRequired,
  sendeplan: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  sendeplan: selectSendeplan(),
  loading: selectSendeplanLoading(),
  error: selectSendeplanError(),
});

function mapDispatchToProps(dispatch) {
  return {
    loadSendeplanDay: (year, month, day, weekDay) =>
      dispatch(loadSendeplan(year, month, day, weekDay)),
  };
}

function isBetween(currentHour, first, last) {
  if (first <= currentHour && currentHour < last) {
    return true;
  }
  return false;
}
export default connect(mapStateToProps, mapDispatchToProps)(Sendeplan);
