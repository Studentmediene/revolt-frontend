/*
 *
 * Player actions
 *
 */

import {
  PLAY_LIVE,
  GET_PODCAST_PLAYLIST_PENDING,
  GET_PODCAST_PLAYLIST_SUCCESS,
  GET_PODCAST_PLAYLIST_FAIELD,
  GET_ON_DEMAND_PLAYLIST_PENDING,
  GET_ON_DEMAND_PLAYLIST_SUCCESS,
  GET_ON_DEMAND_PLAYLIST_FAIELD,
} from './constants';

export function playLive(offset = 0) {
  return {
    type: PLAY_LIVE,
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

export function onDemandPlaylistLoaded(playlist, index, offset = 0) {
  return {
    type: GET_ON_DEMAND_PLAYLIST_SUCCESS,
    playlist,
    index,
    offset,
  };
}

export function onDemandPlaylistError() {
  return {
    type: GET_ON_DEMAND_PLAYLIST_FAIELD,
  };
}
