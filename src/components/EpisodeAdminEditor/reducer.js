/*
 *
 * EpisodeAdminPicker reducer
 *
 */

import { fromJS } from 'immutable';
import {
  UPDATE_EPISODE_PENDING,
  UPDATE_EPISODE_SUCCESS,
  UPDATE_EPISODE_FAILED,
  DELETE_EPISODE_PENDING,
  DELETE_EPISODE_SUCCESS,
  DELETE_EPISODE_FAILED,
} from './constants';

const initialState = fromJS({
  loading: false,
  error: false,
});

function episodeAdminEditorReducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_EPISODE_PENDING:
      return state.set('loading', true).set('error', false);
    case UPDATE_EPISODE_SUCCESS:
      return state.set('loading', false).set('error', false);
    case UPDATE_EPISODE_FAILED:
      return state.set('loading', false).set('error', true);
    case DELETE_EPISODE_PENDING:
      return state.set('loading', true).set('error', false);
    case DELETE_EPISODE_SUCCESS:
      return state.set('loading', false).set('error', false);
    case DELETE_EPISODE_FAILED:
      return state.set('loading', false).set('error', true);
    default:
      return state;
  }
}

export default episodeAdminEditorReducer;
