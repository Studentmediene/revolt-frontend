import React from 'react';
import moment from 'moment';
import ReactGA from 'react-ga';

import FrontPage from '../components/FrontPage';
// import { history } from '../utils/router/reducer';
import { initializeErrorReporting } from '../utils/errorReporting';

if (process.env.NODE_ENV === 'production') {
  initializeErrorReporting();

  ReactGA.initialize('UA-4404225-6', {
    gaOptions: {
      anonymizeIp: true,
    },
  });
  ReactGA.pageview(window.location.pathname + window.location.search);
}

// Set global locales for moment
moment.locale('NB_no', {
  calendar: {
    lastDay: '[I går] HH:mm',
    sameDay: '[I dag] HH:mm',
    nextDay: '[I morgen] HH:mm',
    sameElse: 'DD.MM.YY HH:mm',
  },
  weekdaysShort: 'man_tirs_ons_tors_fre_lør_søn'.split('_'),
  weekdays: 'mandag_tirsdag_onsdag_torsdag_fredag_lørdag_søndag'.split('_'),
});

// Import the CSS reset, which HtmlWebpackPlugin transfers to the build folder
import 'sanitize.css/sanitize.css';

const Page = () => <FrontPage />;

export default Page;
