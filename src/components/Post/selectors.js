import { createSelector } from 'reselect';

/**
 * Direct selector to the post state domain
 */
const selectPostDomain = () => state => state.get('post');

/**
 * Other specific selectors
 */

/**
 * Default selector used by Post
 */

const selectPost = () =>
  createSelector(selectPostDomain(), postState => postState.get('post'));

const selectPostLoading = () =>
  createSelector(selectPostDomain(), postState => postState.get('loading'));

const selectPostError = () =>
  createSelector(selectPostDomain(), postState => postState.get('error'));

export { selectPostDomain, selectPost, selectPostLoading, selectPostError };
