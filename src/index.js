import "core-js/stable";
import "regenerator-runtime/runtime";

import React from 'react';
import moment from 'moment';
import ReactGA from 'react-ga';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Route } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router/immutable'

import App from 'components/App';
import createRoutes from './routes';
import configureStore from './store';
import { history } from 'utils/router/reducer';
import ScrollToTop from 'utils/scrollToTopComponent';
import { initializeErrorReporting } from 'utils/errorReporting';

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

// Create redux store with history
// this uses the singleton history used by connected-react-router
const initialState = {};
const store = configureStore(initialState, history);

const routes = createRoutes(store).map(route => (
  <Route path={route.path} key={route.path} exact={route.exact}>
    <route.component />
  </Route>
));

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <ScrollToTop>
        <App routes={routes} />
      </ScrollToTop>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('app'),
);

// Install ServiceWorker and AppCache in the end since
// it's not most important operation and if main code fails,
// we do not want it installed
import { install, applyUpdate } from 'offline-plugin/runtime';
if ('serviceWorker' in navigator) {
  install({
    onUpdateReady: () => {
      applyUpdate();
    },
    onUpdated: () => {
      window.location.reload();
    },
  });
}
