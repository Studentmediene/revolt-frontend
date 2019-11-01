import { createSelector } from 'reselect';

const selectPostDomain = () => state => state.get('post');

const selectPost = () =>
  createSelector(
    selectPostDomain(),
    postState => postState.get('post'),
  );

const selectPostLoading = () =>
  createSelector(
    selectPostDomain(),
    postState => postState.get('loading'),
  );

const selectPostError = () =>
  createSelector(
    selectPostDomain(),
    postState => postState.get('error'),
  );

export { selectPostDomain, selectPost, selectPostLoading, selectPostError };
