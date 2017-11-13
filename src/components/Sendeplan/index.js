/*
 *
 * Sendeplan
 *
 */
import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import moment from 'moment';
import {
  selectSendeplan,
  selectSendeplanLoading,
  selectSendeplanError,
} from './selectors';
import { loadSendeplan } from './actions';

import styles from './styles.css';

export class Sendeplan extends React.Component {
  // eslint-disable-line react/prefer-stateless-function

  constructor(props) {
    super(props);
    this.state = {
      showAll: false,
    };
  }

  componentDidMount() {
    const dayOfWeek = moment().day(1);
    this.props.loadSendeplanDay(
      dayOfWeek.year(),
      dayOfWeek.month(),
      dayOfWeek.date(),
      'monday',
    );
    dayOfWeek.add(1, 'days');
    this.props.loadSendeplanDay(
      dayOfWeek.year(),
      dayOfWeek.month(),
      dayOfWeek.date(),
      'tuesday',
    );
    dayOfWeek.add(1, 'days');
    this.props.loadSendeplanDay(
      dayOfWeek.year(),
      dayOfWeek.month(),
      dayOfWeek.date(),
      'wednesday',
    );
    dayOfWeek.add(1, 'days');
    this.props.loadSendeplanDay(
      dayOfWeek.year(),
      dayOfWeek.month(),
      dayOfWeek.date(),
      'thursday',
    );
    dayOfWeek.add(1, 'days');
    this.props.loadSendeplanDay(
      dayOfWeek.year(),
      dayOfWeek.month(),
      dayOfWeek.date(),
      'friday',
    );
    dayOfWeek.add(1, 'days');
    this.props.loadSendeplanDay(
      dayOfWeek.year(),
      dayOfWeek.month(),
      dayOfWeek.date(),
      'saturday',
    );
    dayOfWeek.add(1, 'days');
    this.props.loadSendeplanDay(
      dayOfWeek.year(),
      dayOfWeek.month(),
      dayOfWeek.date(),
      'sunday',
    );
  }

  makeSendePlanWeek() {
    this.setState({
      showAll: true,
    });
  }

  render() {
    // Creates an array of all time-stamps for the table.
    let times = [];
    for (let i = 7; i < 24; i++) {
      if (i < 10) {
        times.push(`0${i}:00`);
      } else {
        times.push(`${i}:00`);
      }
    }

    const sendeliste = [];

    function makeSendeliste(json) {
      if (json.length === 0) {
        for (let k = 0; k < 24; k++) {
          sendeliste.push('Ikke tilgjengelig');
        }
      }
      for (let i = 0; i < json.length; i++) {
        for (let j = 0; j < findDiff(json[i]); j++) {
          if (json[i].title !== 'Nattmusikk') {
            sendeliste.push(json[i].title);
          }
        }
      }
    }

    /* Finds the difference in hours of the start time and end time of a show
    and returns the difference so that it can be added into the sendeplan
    this amount of times. */
    function findDiff(json) {
      let diff =
        Number(json.endtime.slice(11, 13)) -
        Number(json.starttime.slice(11, 13));
      if (
        Number(json.endtime.slice(14, 16)) >
        Number(json.starttime.slice(14, 16))
      ) {
        diff += 1;
      }
      return diff;
    }

    if (
      this.props.sendeplan.monday === undefined ||
      this.props.sendeplan.tuesday === undefined ||
      this.props.sendeplan.wednesday === undefined ||
      this.props.sendeplan.thursday === undefined ||
      this.props.sendeplan.friday === undefined ||
      this.props.sendeplan.saturday === undefined ||
      this.props.sendeplan.sunday === undefined
    ) {
      return <p> Sendeplanen lastes inn... </p>;
    }
    makeSendeliste(this.props.sendeplan.monday);
    makeSendeliste(this.props.sendeplan.tuesday);
    makeSendeliste(this.props.sendeplan.wednesday);
    makeSendeliste(this.props.sendeplan.thursday);
    makeSendeliste(this.props.sendeplan.friday);
    makeSendeliste(this.props.sendeplan.saturday);
    makeSendeliste(this.props.sendeplan.sunday);

    times = times.map(time => <td key={time}>{time}</td>);

    function makeSendelisteComponents(daynumber, sendeplan) {
      if (!sendeplan) {
        return null;
      }
      return sendeplan
        .slice(daynumber * 17, (daynumber + 1) * 17)
        .map(program => <td key={program.index}>{program}</td>);
    }

    const mon = makeSendelisteComponents(0, sendeliste);
    const tue = makeSendelisteComponents(1, sendeliste);
    const wed = makeSendelisteComponents(2, sendeliste);
    const thu = makeSendelisteComponents(3, sendeliste);
    const fri = makeSendelisteComponents(4, sendeliste);
    const sat = makeSendelisteComponents(5, sendeliste);
    const sun = makeSendelisteComponents(6, sendeliste);

    const row = times.map((time, index) => (
      <tr key={times.index}>
        {times[index]}
        {mon[index]}
        {tue[index]}
        {wed[index]}
        {thu[index]}
        {fri[index]}
        {sat[index]}
        {sun[index]}
      </tr>
    ));

    const today = moment().day() - 1;
    const now = makeSendelisteComponents(today, sendeliste);
    const rowToday = times.map((time, index) => (
      <tr key={times.index}>
        {times[index]}
        {now[index]}
      </tr>
    ));

    return (
      <div className={styles.sendeplan}>
        <h2>Sendeplan for Radio Revolt</h2>
        {this.state.showAll ? (
          <div>
            <table>
              <tbody>
                <tr>
                  <th>Tid</th>
                  <th>Mandag</th>
                  <th>Tirsdag</th>
                  <th>Onsdag</th>
                  <th>Torsdag</th>
                  <th>Fredag</th>
                  <th>Lørdag</th>
                  <th>Søndag</th>
                </tr>
                {row}
              </tbody>
            </table>
          </div>
        ) : (
          <div>
            <button onClick={() => this.makeSendePlanWeek()}>
              Klikk her for å se program for hele uken
            </button>
            <h3> Sendeplanen for i dag: </h3>
            <table>
              <tbody>
                <tr>
                  <th>Tid</th>
                  <th>Program</th>
                </tr>
                {rowToday}
              </tbody>
            </table>
          </div>
        )}
      </div>
    );
  }
}

Sendeplan.propTypes = {
  loadSendeplanDay: React.PropTypes.func.isRequired,
  sendeplan: React.PropTypes.object,
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

export default connect(mapStateToProps, mapDispatchToProps)(Sendeplan);
