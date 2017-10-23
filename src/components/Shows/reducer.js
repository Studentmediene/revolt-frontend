/*
 *
 * Shows reducer
 *
 */

import { fromJS } from 'immutable';
import {
  LOAD_SHOWS_PENDING,
  LOAD_SHOWS_SUCCESS,
  LOAD_SHOWS_FAILED,
} from './constants';

const initialState = fromJS({
  loading: false,
  error: false,
  shows: false,
});

function showsReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_SHOWS_PENDING:
      return state.set('loading', true).set('error', false);
    case LOAD_SHOWS_SUCCESS:
      return state
        .set('shows', action.shows)
        .set('loading', false)
        .set('error', false);
    case LOAD_SHOWS_FAILED:
      return state.set('loading', false).set('error', true);
    default:
      return state;
  }
}

export default showsReducer;
