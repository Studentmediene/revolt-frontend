import { createSelector } from 'reselect';

/**
 * Direct selector to the player state domain
 */
const selectPlayerDomain = () => state => state.get('player');

const selectLiveTitle = () =>
  createSelector(selectPlayerDomain(), playerState =>
    playerState.get('liveTitle'),
  );

export { selectLiveTitle };
