/*
 *
 * FrontPage reducer
 *
 */

import { fromJS } from 'immutable';
import {
  LOAD_FRONT_PAGE_POSTS_PENDING,
  LOAD_FRONT_PAGE_POSTS_SUCCESS,
  LOAD_FRONT_PAGE_POSTS_FAILED,
} from './constants';

const initialState = fromJS({
  loading: false,
  error: false,
  posts: false,
});

function frontPageReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_FRONT_PAGE_POSTS_PENDING:
      return state.set('loading', true).set('error', false);
    case LOAD_FRONT_PAGE_POSTS_SUCCESS:
      return state
        .set('loading', false)
        .set('error', false)
        .set('posts', action.posts);
    case LOAD_FRONT_PAGE_POSTS_FAILED:
      return state.set('loading', false).set('error', true);
    default:
      return state;
  }
}

export default frontPageReducer;
