import { createSelector } from 'reselect';

/**
 * Direct selector to the episodeAdmin state domain
 */
const selectEpisodeAdminDomain = () => state => state.get('episodeAdmin');

const selectAddEpisodeLoading = () =>
  createSelector(selectEpisodeAdminDomain(), state =>
    state.get('addEpisodeLoading'),
  );

const selectAddEpisodeError = () =>
  createSelector(selectEpisodeAdminDomain(), state =>
    state.get('addEpisodeError'),
  );

const selectDigasEpisodesLoading = () =>
  createSelector(selectEpisodeAdminDomain(), state =>
    state.get('digasLoading'),
  );

const selectDigasEpisodesError = () =>
  createSelector(selectEpisodeAdminDomain(), state => state.get('digasError'));

const selectDigasOnDemandEpisodes = () =>
  createSelector(selectEpisodeAdminDomain(), state =>
    state.get('digasOnDemandEpisodes'),
  );

const selectDigasPodcastEpisodes = () =>
  createSelector(selectEpisodeAdminDomain(), state =>
    state.get('digasPodcastEpisodes'),
  );

export {
  selectEpisodeAdminDomain,
  selectAddEpisodeLoading,
  selectAddEpisodeError,
  selectDigasOnDemandEpisodes,
  selectDigasPodcastEpisodes,
  selectDigasEpisodesLoading,
  selectDigasEpisodesError,
};
