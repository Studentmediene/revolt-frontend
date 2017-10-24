import React from 'react';
import ReactDOM from 'react-dom';
import ReactGA from 'react-ga';
import { Provider } from 'react-redux';
import { Route } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';

import App from 'components/App';
import configureStore from 'store';
import createRoutes from 'routes';

import { initializeErrorReporting } from 'utils/errorReporting';
initializeErrorReporting();

// Import the CSS reset, which HtmlWebpackPlugin transfers to the build folder
import 'sanitize.css/sanitize.css';

// Create redux store with history
// this uses the singleton browserHistory provided by react-router-redux
const initialState = {};
const history = createHistory();
const store = configureStore(initialState, history);

// Set up Google Analytics
ReactGA.initialize('UA-4404225-6');
history.listen(location => {
  ReactGA.set({ page: location.pathname });
  ReactGA.pageview(location.pathname);
});

const routes = createRoutes(store).map(route => (
  <Route
    path={route.path}
    component={route.component}
    key={route.path}
    exact={route.exact}
  />
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
import { install } from 'offline-plugin/runtime';
install();
