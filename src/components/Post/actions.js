/*
 *
 * Post actions
 *
 */

import {
  LOAD_POST_PENDING,
  LOAD_POST_SUCCESS,
  LOAD_POST_FAILED,
} from './constants';

export function loadPost(slug) {
  return {
    type: LOAD_POST_PENDING,
    slug,
  };
}

export function postLoaded(post, slug) {
  return {
    type: LOAD_POST_SUCCESS,
    post,
    slug,
  };
}

export function postError() {
  return {
    type: LOAD_POST_FAILED,
  };
}
