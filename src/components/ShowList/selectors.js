import { createSelector } from 'reselect';

const selectShowsDomain = () => state => state.get('showList');

const selectShows = () =>
  createSelector(
    selectShowsDomain(),
    showState => showState.get('shows'),
  );

const selectShowsLoading = () =>
  createSelector(
    selectShowsDomain(),
    showState => showState.get('loading'),
  );

const selectShowsError = () =>
  createSelector(
    selectShowsDomain(),
    showState => showState.get('error'),
  );

export { selectShowsDomain, selectShows, selectShowsLoading, selectShowsError };
