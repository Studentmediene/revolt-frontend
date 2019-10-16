import { fromJS } from 'immutable';
import createSagaMiddleware from 'redux-saga';
import { createStore, applyMiddleware, compose } from 'redux';
// import { routerMiddleware } from 'connected-react-router/immutable';

import createReducer from './reducers';
// import playerSagas from 'components/Player/sagas';
import footerSagas from 'components/Footer/sagas';

const sagaMiddleware = createSagaMiddleware();
// const devtools = window.devToolsExtension || (() => noop => noop);

export default function configureStore(initialState = {}) {
  // Create the store with two middlewares
  // 1. sagaMiddleware: Makes redux-sagas work
  // 2. routerMiddleware: Syncs the location/URL path to the state
  const middlewares = [sagaMiddleware];

  const enhancers = [applyMiddleware(...middlewares)];

  const store = createStore(
    createReducer(),
    fromJS(initialState),
    compose(...enhancers),
  );

  // Create hook for async sagas
  store.runSaga = sagaMiddleware.run;

  // Run global player saga
  // playerSagas.map(sagaMiddleware.run);

  // Run global footer saga
  footerSagas.map(sagaMiddleware.run);

  // Make reducers hot reloadable, see http://mxs.is/googmo
  /* istanbul ignore next */
  if (module.hot) {
    import('./reducers').then(reducerModule => {
      const createReducers = reducerModule.default;
      const nextReducers = createReducers(store.asyncReducers);

      store.replaceReducer(nextReducers);
    });
  }

  // Initialize it with no other reducers
  store.asyncReducers = {};
  return store;
}
