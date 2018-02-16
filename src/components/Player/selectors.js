import { createSelector } from 'reselect';

/**
 * Direct selector to the player state domain
 */
const selectPlayerDomain = () => state => state.get('player');

/**
 * Other specific selectors
 */

/**
 * Default selector used by Player
 */

const selectPlaylist = () =>
  createSelector(selectPlayerDomain(), playerState =>
    playerState.get('playlist'),
  );

const selectIndex = () =>
  createSelector(selectPlayerDomain(), playerState => playerState.get('index'));

const selectOffset = () =>
  createSelector(selectPlayerDomain(), playerState =>
    playerState.get('offset'),
  );

const selectLive = () =>
  createSelector(selectPlayerDomain(), playerState => playerState.get('live'));

const selectPlayerLoading = () =>
  createSelector(selectPlayerDomain(), playerState =>
    playerState.get('loading'),
  );

const selectPlayerError = () =>
  createSelector(selectPlayerDomain(), playerState => playerState.get('error'));

const selectPlayingTitle = () =>
  createSelector(selectPlayerDomain(), playerState =>
    playerState.get('playingTitle'),
  );

const selectUrl = () =>
  createSelector(selectPlayerDomain(), playerState => playerState.get('url'));

const selectPaused = () =>
  createSelector(selectPlayerDomain(), playerState =>
    playerState.get('paused'),
  );

export {
  selectPlayerDomain,
  selectPlaylist,
  selectIndex,
  selectOffset,
  selectLive,
  selectPaused,
  selectUrl,
  selectPlayerLoading,
  selectPlayerError,
  selectPlayingTitle,
};
