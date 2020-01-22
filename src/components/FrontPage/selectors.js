import { createSelector } from 'reselect';

const selectFrontPageDomain = () => state => state.get('frontPage');

const selectFrontPagePosts = () =>
  createSelector(selectFrontPageDomain(), frontPage => frontPage.get('posts'));

const selectHighlightedPosts = () =>
  createSelector(selectFrontPageDomain(), frontPage =>
    frontPage.get('highlightedPosts'),
  );

const selectNewestEpisodes = () =>
  createSelector(selectFrontPageDomain(), frontPage =>
    frontPage.get('newestEpisodes'),
  );

const selectFrontPagePostsLoading = () =>
  createSelector(selectFrontPageDomain(), frontPage =>
    frontPage.get('loading'),
  );

const selectFrontPagePostsError = () =>
  createSelector(selectFrontPageDomain(), frontPage => frontPage.get('error'));

const selectPostOffset = () =>
  createSelector(selectFrontPageDomain(), frontPage => {
    return frontPage.get('postOffset');
  });

const selectHasLoaded = () =>
  createSelector(selectFrontPageDomain(), frontPage => {
    return frontPage.get('hasLoaded');
  });

export {
  selectFrontPagePosts,
  selectHighlightedPosts,
  selectFrontPagePostsLoading,
  selectFrontPagePostsError,
  selectPostOffset,
  selectHasLoaded,
  selectNewestEpisodes,
};
