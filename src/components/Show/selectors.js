import { createSelector } from 'reselect';

const selectShowDomain = () => state => state.get('show');

const selectShow = () =>
  createSelector(
    selectShowDomain(),
    showState => showState.get('show'),
  );

const selectShowEpisodes = () =>
  createSelector(
    selectShowDomain(),
    showState => showState.get('episodes'),
  );

const selectShowPosts = () =>
  createSelector(
    selectShowDomain(),
    showState => showState.get('posts'),
  );

const selectShowLoading = () =>
  createSelector(
    selectShowDomain(),
    showState => showState.get('loading'),
  );

const selectShowError = () =>
  createSelector(
    selectShowDomain(),
    showState => showState.get('error'),
  );

export {
  selectShowDomain,
  selectShow,
  selectShowEpisodes,
  selectShowPosts,
  selectShowLoading,
  selectShowError,
};
