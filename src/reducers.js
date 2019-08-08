/**
 * Combine all reducers in this file and export the combined reducers.
 * If we were to do this in store.js, reducers wouldn't be hot reloadable.
 */

import { combineReducers } from 'redux-immutable';

import routerReducer from 'utils/router/reducer';
import playerReducer from 'components/Player/reducer';
import footerReducer from 'components/Footer/reducer';

/**
 * Creates the root reducer with the asynchronously loaded ones
 */
export default function createReducer(asyncReducers) {
  return combineReducers({
    router: routerReducer,
    player: playerReducer,
    footer: footerReducer,
    ...asyncReducers,
  });
}
