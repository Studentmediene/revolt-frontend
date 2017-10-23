import { createSelector } from 'reselect';

/**
 * Direct selector to the show state domain
 */
const selectShowDomain = () => state => state.get('show');

/**
 * Other specific selectors
 */

/**
 * Default selector used by Show
 */

const selectShow = () =>
  createSelector(selectShowDomain(), showState => showState.get('show'));

const selectShowEpisodes = () =>
  createSelector(selectShowDomain(), showState => showState.get('episodes'));

const selectShowPosts = () =>
  createSelector(selectShowDomain(), showState => showState.get('posts'));

const selectShowLoading = () =>
  createSelector(selectShowDomain(), showState => showState.get('loading'));

const selectShowError = () =>
  createSelector(selectShowDomain(), showState => showState.get('error'));

export {
  selectShowDomain,
  selectShow,
  selectShowEpisodes,
  selectShowPosts,
  selectShowLoading,
  selectShowError,
};
