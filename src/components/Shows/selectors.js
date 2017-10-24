import { createSelector } from 'reselect';

/**
 * Direct selector to the shows state domain
 */
const selectShowsDomain = () => state => state.get('shows');

/**
 * Other specific selectors
 */

/**
 * Default selector used by Shows
 */

const selectShows = () =>
  createSelector(selectShowsDomain(), showState => showState.get('shows'));

const selectShowsLoading = () =>
  createSelector(selectShowsDomain(), showState => showState.get('loading'));

const selectShowsError = () =>
  createSelector(selectShowsDomain(), showState => showState.get('error'));

export { selectShowsDomain, selectShows, selectShowsLoading, selectShowsError };
