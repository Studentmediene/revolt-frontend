import { createSelector } from 'reselect';

const selectShowsDomain = () => state => state.get('showList');

export const selectShows = () =>
  createSelector(
    selectShowsDomain(),
    showState => showState.get('shows'),
  );

export const selectCategories = () =>
  createSelector(
    selectShowsDomain(),
    showState => showState.get('categories'),
  );

export const selectShowsLoading = () =>
  createSelector(
    selectShowsDomain(),
    showState => showState.get('loading'),
  );

export const selectShowsError = () =>
  createSelector(
    selectShowsDomain(),
    showState => showState.get('error'),
  );
