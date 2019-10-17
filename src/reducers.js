/**
 * Combine all reducers in this file and export the combined reducers.
 * If we were to do this in store.js, reducers wouldn't be hot reloadable.
 */

import { combineReducers } from 'redux-immutable';

import playerReducer from 'components/Player/reducer';
import footerReducer from 'components/Footer/reducer';
import frontPageReducer from 'components/FrontPage/reducer';
import aboutReducer from 'components/About/reducer';

/**
 * Creates the root reducer with the asynchronously loaded ones
 */
export default function createReducer() {
  return combineReducers({
    player: playerReducer,
    footer: footerReducer,
    frontPage: frontPageReducer,
    about: aboutReducer,
  });
}
