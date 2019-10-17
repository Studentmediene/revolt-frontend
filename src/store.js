import { fromJS } from 'immutable';
import createSagaMiddleware from 'redux-saga';
import { createStore, applyMiddleware, compose } from 'redux';

import rootSaga from './sagas';
import createReducer from './reducers';

const sagaMiddleware = createSagaMiddleware();

const composeEnhancers =
  (typeof window != 'undefined' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

function configureStore(initialState = {}) {
  const store = createStore(
    createReducer(),
    fromJS(initialState),
    composeEnhancers(applyMiddleware(sagaMiddleware)),
  );

  store.sagaTask = sagaMiddleware.run(rootSaga);

  return store;
}

export default configureStore;
