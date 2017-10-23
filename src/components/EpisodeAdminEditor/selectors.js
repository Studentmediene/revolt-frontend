import { createSelector } from 'reselect';

/**
 * Direct selector to the episodeAdminPicker state domain
 */
const selectEpisodeAdminEditorDomain = () => state =>
  state.get('episodeAdminEditor');

const selectUpdateEpisodeLoading = () =>
  createSelector(selectEpisodeAdminEditorDomain(), state =>
    state.get('loading'),
  );

const selectUpdateEpisodeError = () =>
  createSelector(selectEpisodeAdminEditorDomain(), state => state.get('error'));

export { selectUpdateEpisodeLoading, selectUpdateEpisodeError };
