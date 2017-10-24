import { createSelector } from 'reselect';

/**
 * Direct selector to the shows state domain
 */
const selectShowAdminDomain = () => state => state.get('ShowAdmin');

const selectDigasShows = () =>
  createSelector(selectShowAdminDomain(), showState =>
    showState.get('digasShows'),
  );

const selectDigasShowsLoading = () =>
  createSelector(selectShowAdminDomain(), showState =>
    showState.get('digasLoading'),
  );

const selectDigasShowsError = () =>
  createSelector(selectShowAdminDomain(), showState =>
    showState.get('digasError'),
  );

const selectDigasPodcastUrl = () =>
  createSelector(selectShowAdminDomain(), state =>
    state.get('digasPodcastUrl'),
  );

const selectDigasPodcastUrlLoading = () =>
  createSelector(selectShowAdminDomain(), state =>
    state.get('digasPodcastUrlLoading'),
  );

const selectDigasPodcastUrlError = () =>
  createSelector(selectShowAdminDomain(), state =>
    state.get('digasPodcastUrlError'),
  );

export {
  selectShowAdminDomain,
  selectDigasShows,
  selectDigasShowsLoading,
  selectDigasShowsError,
  selectDigasPodcastUrl,
  selectDigasPodcastUrlLoading,
  selectDigasPodcastUrlError,
};
