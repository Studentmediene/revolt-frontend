/*
 *
 * Player actions
 *
 */

import {
  PLAY_LIVE,
  PLAY_LIVE_PENDING,
  GET_PODCAST_PLAYLIST_PENDING,
  GET_PODCAST_PLAYLIST_SUCCESS,
  GET_PODCAST_PLAYLIST_FAIELD,
  GET_ON_DEMAND_PLAYLIST_PENDING,
  GET_ON_DEMAND_PLAYLIST_SUCCESS,
  GET_ON_DEMAND_PLAYLIST_FAILED,
  GET_LIVE_TITLE,
  LIVE_TITLE_UPDATER,
  TOGGLE_PLAY_PAUSE,
  RESUME,
  PAUSE,
  PLAYER_STATUS,
  PLAY_NEXT,
  PLAY_PREVIOUS,
  PLAY_ON_DEMAND_EPISODE,
} from './constants';

export function playLive(offset = 0) {
  return {
    type: PLAY_LIVE_PENDING,
    offset,
  };
}

export function playLiveURL(url, offset = 0) {
  return {
    type: PLAY_LIVE,
    url,
    offset,
  };
}

export function getPodcastPlaylist(episodeId, offset = 0) {
  return {
    type: GET_PODCAST_PLAYLIST_PENDING,
    episodeId,
    offset,
  };
}

export function podcastPlaylistLoaded(playlist, index, offset = 0) {
  return {
    type: GET_PODCAST_PLAYLIST_SUCCESS,
    playlist,
    index,
    offset,
  };
}

export function podcastPlaylistError() {
  return {
    type: GET_PODCAST_PLAYLIST_FAIELD,
  };
}

export function getOnDemandPlaylist(episodeId, offset = 0) {
  return {
    type: GET_ON_DEMAND_PLAYLIST_PENDING,
    episodeId,
    offset,
  };
}

export function onDemandPlaylistLoaded(playlist) {
  return {
    type: GET_ON_DEMAND_PLAYLIST_SUCCESS,
    playlist,
  };
}

export function onDemandPlaylistError() {
  return {
    type: GET_ON_DEMAND_PLAYLIST_FAILED,
  };
}

export function currentShowTitle(liveTitle) {
  return {
    type: GET_LIVE_TITLE,
    liveTitle,
  };
}

export function togglePlayPause() {
  return {
    type: TOGGLE_PLAY_PAUSE,
  };
}

export function resume() {
  return {
    type: RESUME,
  };
}

export function pause() {
  return {
    type: PAUSE,
  };
}

export function playerStatus({ paused }) {
  return {
    type: PLAYER_STATUS,
    paused,
  };
}

export function playNext() {
  return {
    type: PLAY_NEXT,
  };
}

export function playPrevious() {
  return {
    type: PLAY_PREVIOUS,
  };
}

export function playOnDemandEpisode(index, offset = 0) {
  return {
    type: PLAY_ON_DEMAND_EPISODE,
    index,
    offset,
  };
}

export function liveTitleUpdater() {
  return {
    type: LIVE_TITLE_UPDATER,
  };
}
