import {
  LOAD_FRONT_PAGE_POSTS_PENDING,
  LOAD_FRONT_PAGE_POSTS_SUCCESS,
  LOAD_FRONT_PAGE_POSTS_FAILED
} from './constants';

export function loadFrontPagePosts(postOffset) {
  return {
    type: LOAD_FRONT_PAGE_POSTS_PENDING,
    postOffset
  };
}

export function frontPagePostsLoaded({ highlightedPosts, posts, newestEpisodes, }) {
  return {
    type: LOAD_FRONT_PAGE_POSTS_SUCCESS,
    highlightedPosts,
    posts,
    newestEpisodes,
  };
}

export function frontPagePostsError() {
  return {
    type: LOAD_FRONT_PAGE_POSTS_FAILED
  };
}
