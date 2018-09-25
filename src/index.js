import React from 'react';
import ReactDOM from 'react-dom';
import moment from 'moment';
import { Provider } from 'react-redux';
import { Route } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';

import App from 'components/App';
import configureStore from 'store';
import createRoutes from 'routes';

import ScrollToTop from 'utils/scrollToTopComponent';
import { initializeErrorReporting } from 'utils/errorReporting';

if (process.env.NODE_ENV === 'production') {
  initializeErrorReporting();
}

// Set global locales for moment
moment.locale('NB_no', {
  calendar: {
    lastDay: '[I går] HH:mm',
    sameDay: '[I dag] HH:mm',
    nextDay: '[I morgen] HH:mm',
    sameElse: 'DD.MM.YY HH:mm',
  },
});

// Import the CSS reset, which HtmlWebpackPlugin transfers to the build folder
import 'sanitize.css/sanitize.css';

// Create redux store with history
// this uses the singleton browserHistory provided by react-router-redux
const initialState = {};
const history = createHistory();
const store = configureStore(initialState, history);

const routes = createRoutes(store).map(route => (
  <Route path={route.path} key={route.path} exact={route.exact}>
    <ScrollToTop>
      <route.component />
    </ScrollToTop>
  </Route>
));

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App routes={routes} />
    </ConnectedRouter>
  </Provider>,
  document.getElementById('app'),
);

// Install ServiceWorker and AppCache in the end since
// it's not most important operation and if main code fails,
// we do not want it installed
import { install, applyUpdate } from 'offline-plugin/runtime';
install({
  onUpdateReady: () => {
    applyUpdate();
  },
  onUpdated: () => {
    window.location.reload();
  },
});
