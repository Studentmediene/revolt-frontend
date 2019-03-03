import { createSelector } from 'reselect';


const selectPlayerDomain = () => state => state.get('player');


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
const selectEpisodeId = () =>
  createSelector(selectPlayerDomain(), playerState =>
    playerState.get('episodeId'),
  );

const selectUrl = () =>
  createSelector(selectPlayerDomain(), playerState => playerState.get('url'));

const selectPaused = () =>
  createSelector(selectPlayerDomain(), playerState =>
    playerState.get('paused'),
  );

const selectLiveTitle = () =>
  createSelector(selectPlayerDomain(), playerState =>
    playerState.get('liveTitle'),
  );

export {
  selectPlayerDomain,
  selectPlaylist,
  selectIndex,
  selectOffset,
  selectLive,
  selectPaused,
  selectEpisodeId,
  selectUrl,
  selectPlayerLoading,
  selectPlayerError,
  selectPlayingTitle,
  selectLiveTitle,
};
