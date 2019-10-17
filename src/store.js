import { fromJS } from 'immutable';
import createSagaMiddleware from 'redux-saga';
import { createStore, applyMiddleware, compose } from 'redux';

import createReducer from './reducers';
import sagas from './sagas';

const sagaMiddleware = createSagaMiddleware();

const composeEnhancers =
  (typeof window != 'undefined' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

function configureStore(initialState = {}) {
  // Create the store with middlewares
  // 1. sagaMiddleware: Makes redux-sagas work

  const store = createStore(
    createReducer(),
    fromJS(initialState),
    composeEnhancers(applyMiddleware(sagaMiddleware)),
  );

  sagas.map(s => s.map(sagaMiddleware.run));

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
  return store;
}

const initialState = {};
export default configureStore(initialState);
