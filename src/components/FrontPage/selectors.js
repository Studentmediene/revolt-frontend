import { createSelector } from 'reselect';

/**
 * Direct selector to the frontPage state domain
 */
const selectFrontPageDomain = () => state => state.get('frontPage');

/**
 * Other specific selectors
 */

/**
 * Default selector used by FrontPage
 */

const selectFrontPagePosts = () =>
  createSelector(selectFrontPageDomain(), frontPage => frontPage.get('posts'));

const selectFrontPagePostsLoading = () =>
  createSelector(selectFrontPageDomain(), frontPage =>
    frontPage.get('loading'),
  );

const selectFrontPagePostsError = () =>
  createSelector(selectFrontPageDomain(), frontPage => frontPage.get('error'));

export {
  selectFrontPageDomain,
  selectFrontPagePosts,
  selectFrontPagePostsLoading,
  selectFrontPagePostsError,
};
