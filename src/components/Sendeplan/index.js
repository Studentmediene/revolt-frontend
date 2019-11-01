import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import { fromJS } from 'immutable';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import {
  loadSendeplans,
  getNextDay,
  getPrevDay,
  setActiveDays,
} from './actions';
import {
  selectSendeplan,
  selectSendeplanLoading,
  selectSendeplanError,
  selectSendeplanCurrentDay,
  selectSendeplanNextDay,
} from './selectors';
import Loader from 'components/Loader';
import { timestampKey } from './utils';
import SendeplanTable from './components/SendeplanTable';
import SendeplanButton from './components/SendeplanButton';

import styles from './styles.scss';

export class Sendeplan extends React.Component {
  static async getInitialProps(ctx) {
    const { store } = ctx;
    store.dispatch(setActiveDays(moment(), moment().add(1, 'days')));
    if (selectSendeplan()(store.getState()).isEmpty()) {
      const today = moment();
      const tomorrow = today.clone().add(1, 'days');
      store.dispatch(loadSendeplans([today, tomorrow]));
    }

    return {};
  }

  render() {
    if (this.props.loading) {
      return <Loader />;
    }

    const sendeplan = fromJS(this.props.sendeplan);

    if (sendeplan.isEmpty && sendeplan.isEmpty()) {
      return <Loader />;
    }

    const firstDay = moment(this.props.firstDay);
    const firstDayShows = sendeplan.get(
      timestampKey(firstDay.year(), firstDay.month() + 1, firstDay.date()),
    );
    const secondDay = moment(this.props.secondDay);
    const secondDayShows = sendeplan.get(
      timestampKey(secondDay.year(), secondDay.month() + 1, secondDay.date()),
    );

    return (
      <div className={styles.wrapper}>
        <SendeplanButton onClick={() => this.props.getPrevDay(firstDay)}>
          &lt;
        </SendeplanButton>
        <SendeplanTable day={firstDay} shows={firstDayShows} />
        <SendeplanTable
          day={secondDay}
          shows={secondDayShows}
          hideOnSmallScreen
        />
        <SendeplanButton onClick={() => this.props.getNextDay(secondDay)}>
          &gt;
        </SendeplanButton>
      </div>
    );
  }
}

Sendeplan.propTypes = {
  sendeplan: PropTypes.object,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.bool.isRequired,
  firstDay: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  secondDay: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
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
    getNextDay: timestamp => dispatch(getNextDay(timestamp)),
    getPrevDay: timestamp => dispatch(getPrevDay(timestamp)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Sendeplan);
