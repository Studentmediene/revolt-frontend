/*
 *
 * FrontPage actions
 *
 */

import {
  LOAD_FRONT_PAGE_POSTS_PENDING,
  LOAD_FRONT_PAGE_POSTS_SUCCESS,
  LOAD_FRONT_PAGE_POSTS_FAILED,
} from './constants';

export function loadFrontPagePosts(pageNumber) {
  return {
    type: LOAD_FRONT_PAGE_POSTS_PENDING,
    pageNumber,
  };
}

export function frontPagePostsLoaded(posts) {
  return {
    type: LOAD_FRONT_PAGE_POSTS_SUCCESS,
    posts,
  };
}

export function frontPagePostsError() {
  return {
    type: LOAD_FRONT_PAGE_POSTS_FAILED,
  };
}
