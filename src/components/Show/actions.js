/*
 *
 * Show actions
 *
 */

import {
  LOAD_SHOW_PENDING,
  LOAD_SHOW_BY_ID_PENDING,
  LOAD_SHOW_SUCCESS,
  LOAD_SHOW_FAILED,
  CLEAR_SHOW,
} from './constants';

export function loadShow(slug) {
  return {
    type: LOAD_SHOW_PENDING,
    slug,
  };
}

export function loadShowById(id) {
  return {
    type: LOAD_SHOW_BY_ID_PENDING,
    id,
  };
}

export function showLoaded(data) {
  return {
    type: LOAD_SHOW_SUCCESS,
    show: data.show,
    episodes: data.episodes,
    posts: data.posts,
  };
}

export function showError() {
  return {
    type: LOAD_SHOW_FAILED,
  };
}

export function clearShow() {
  return {
    type: CLEAR_SHOW,
  };
}
