import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import moment from 'moment';
import classNames from 'classnames';

import Loader from 'components/Loader';
import {
  selectSendeplan,
  selectSendeplanLoading,
  selectSendeplanError,
  selectSendeplanCurrentDay,
  selectSendeplanNextDay,
} from './selectors';
import { loadSendeplan, getNextDay, getPrevDay } from './actions';
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
    this.props.loadSendeplanDay(today);

    const tomorrow = today.add(1, 'days');
    this.props.loadSendeplanDay(tomorrow);
  }

  makeSendePlanDay(showStart, date) {
    if (Object.entries(showStart).length === 0) {
      return [
        <div key="notAvailable" className={styles.notAvailable}>
          Ikke tilgjengelig
        </div>,
      ];
    }
    const showTable = [];
    const today = moment();
    const isToday =
      date.isSame(today, 'year') &&
      date.isSame(today, 'month') &&
      date.isSame(today, 'day');
    let lastShowName = 'Nattmusikk';
    let currentHour = moment().hour();
    showTable.push(
      <div className={classNames(styles.row, styles.headerCell)}>
        <div className={styles.time}>Tid</div>{' '}
        <div className={styles.title}>Program</div>
      </div>,
    );
    for (let hour = 7; hour < 24; hour++) {
      const isNow = isToday && isBetween(currentHour, hour, hour + 1);
      const hourString = String(hour).padStart(2, '0');
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
          className={classNames(styles.row, {
            [styles.activeNow]: isNow,
          })}
        >
          <div className={styles.time}>{hourString}:00</div>
          <div className={styles.title}>{lastShowName}</div>
        </div>,
      );
    }
    return showTable;
  }
  makeShowStarts(sendeplanDay) {
    const showStarts = {};
    if (!sendeplanDay) {
      return showStarts;
    }
    for (let show of sendeplanDay) {
      showStarts[moment(show.starttime).hour()] = show.title;
    }
    return showStarts;
  }

  makeDayTitle(date) {
    const today = moment();
    const isToday =
      date.isSame(today, 'year') &&
      date.isSame(today, 'month') &&
      date.isSame(today, 'day');

    const tomorrow = today.add(1, 'days');
    const isTomorrow =
      date.isSame(tomorrow, 'year') &&
      date.isSame(tomorrow, 'month') &&
      date.isSame(tomorrow, 'day');

    if (isToday) {
      return <div className={styles.date}>I dag</div>;
    }
    if (isTomorrow) {
      return <div className={styles.date}>I morgen</div>;
    } else {
      return <div className={styles.date}>{date.format('DD.MM.YYYY')}</div>;
    }
  }

  render() {
    if (this.props.loading) {
      return <Loader />;
    }

    if (this.props.sendeplan.isEmpty && this.props.sendeplan.isEmpty()) {
      return <div>Loading sendeplan</div>;
    }
    if (this.props.loading) {
      return <div>Loading sendeplan</div>;
    }

    const firstDayShowStarts = this.makeShowStarts(
      this.props.sendeplan[
        `${this.props.firstDay.year()}.${this.props.firstDay.month() +
          1}.${this.props.firstDay.date()}`
      ],
    );
    const secondDayShowStarts = this.makeShowStarts(
      this.props.sendeplan[
        `${this.props.secondDay.year()}.${this.props.secondDay.month() +
          1}.${this.props.secondDay.date()}`
      ],
    );
    const firstDayShows = this.makeSendePlanDay(
      firstDayShowStarts,
      this.props.firstDay,
    );
    const secondDayShows = this.makeSendePlanDay(
      secondDayShowStarts,
      this.props.secondDay,
    );

    return (
      <div className={styles.wrapper}>
        <div className={styles.buttonWrapper}>
          <button
            className={styles.button}
            onClick={() => this.props.getPrevDay(this.props.firstDay)}
          >
            &lt;
          </button>
        </div>
        <div className={styles.day}>
          <div>
            {this.makeDayTitle(this.props.firstDay)}
            {firstDayShows}
          </div>
        </div>
        <div className={classNames(styles.day, styles.secondDay)}>
          <div>
            {this.makeDayTitle(this.props.secondDay)}
            {secondDayShows}
          </div>
        </div>
        <div className={styles.buttonWrapper}>
          <button
            className={styles.button}
            onClick={() => this.props.getNextDay(this.props.secondDay)}
          >
            &gt;
          </button>
        </div>
      </div>
    );
  }
}

Sendeplan.propTypes = {
  loadSendeplanDay: PropTypes.func.isRequired,
  sendeplan: PropTypes.object,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.bool.isRequired,
  firstDay: PropTypes.object,
  secondDay: PropTypes.object,
  getNextDay: PropTypes.func.isRequired,
  getPrevDay: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  sendeplan: selectSendeplan(),
  loading: selectSendeplanLoading(),
  error: selectSendeplanError(),
  firstDay: selectSendeplanCurrentDay(),
  secondDay: selectSendeplanNextDay(),
});

function mapDispatchToProps(dispatch) {
  return {
    loadSendeplanDay: timestamp => dispatch(loadSendeplan(timestamp)),
    getNextDay: timestamp => dispatch(getNextDay(timestamp)),
    getPrevDay: timestamp => dispatch(getPrevDay(timestamp)),
  };
}

function isBetween(currentHour, first, last) {
  if (first <= currentHour && currentHour < last) {
    return true;
  }
  return false;
}
export default connect(mapStateToProps, mapDispatchToProps)(Sendeplan);
