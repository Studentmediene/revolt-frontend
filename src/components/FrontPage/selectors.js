import { createSelector } from 'reselect';

const selectFrontPageDomain = () => state => state.get('frontPage');

const selectFrontPagePosts = () =>
  createSelector(selectFrontPageDomain(), frontPage => frontPage.get('posts'));

const selectFrontPagePostsLoading = () =>
  createSelector(selectFrontPageDomain(), frontPage =>
    frontPage.get('loading'),
  );

const selectFrontPagePostsError = () =>
  createSelector(selectFrontPageDomain(), frontPage => frontPage.get('error'));

const selectPageNumber = () =>
  createSelector(selectFrontPageDomain(), frontPage => {
    return frontPage.get('pageNumber');
  });

const selectHasLoaded = () =>
  createSelector(selectFrontPageDomain(), frontPage => {
    return frontPage.get('hasLoaded');
  });

export {
  selectFrontPagePosts,
  selectFrontPagePostsLoading,
  selectFrontPagePostsError,
  selectPageNumber,
  selectHasLoaded,
};
