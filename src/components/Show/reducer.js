/*
 *
 * Show reducer
 *
 */

import { fromJS } from 'immutable';
import {
  LOAD_SHOW_PENDING,
  LOAD_SHOW_BY_ID_PENDING,
  LOAD_SHOW_SUCCESS,
  LOAD_SHOW_FAILED,
  CLEAR_SHOW,
} from './constants';

const initialState = fromJS({
  show: false,
  episodes: false,
  posts: false,
  loading: false,
  error: false,
});

function showReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_SHOW_PENDING:
      return state
        .set('loading', true)
        .set('error', false)
        .set('show', false)
        .set('episodes', false)
        .set('posts', false);
    case LOAD_SHOW_BY_ID_PENDING:
      return state
        .set('loading', true)
        .set('error', false)
        .set('show', false)
        .set('episodes', false)
        .set('posts', false);
    case LOAD_SHOW_SUCCESS:
      return state
        .set('loading', false)
        .set('error', false)
        .set('show', action.show)
        .set('episodes', action.episodes)
        .set('posts', action.posts);
    case LOAD_SHOW_FAILED:
      return state.set('loading', true).set('error', false);
    case CLEAR_SHOW:
      return initialState;
    default:
      return state;
  }
}

export default showReducer;
