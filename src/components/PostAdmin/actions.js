/*
 *
 * PostAdmin actions
 *
 */
import {
  ADD_POST_PENDING,
  ADD_POST_SUCCESS,
  ADD_POST_FAILED,
} from './constants';

export function addPostPending(post) {
  return {
    type: ADD_POST_PENDING,
    post,
  };
}

export function addPostSuccess(post) {
  return {
    type: ADD_POST_SUCCESS,
    post,
  };
}

export function addPostError(error) {
  return {
    type: ADD_POST_FAILED,
    error,
  };
}
