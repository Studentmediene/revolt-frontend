/*
 *
 * EpisodeAdminPicker actions
 *
 */

import {
  UPDATE_EPISODE_PENDING,
  UPDATE_EPISODE_SUCCESS,
  UPDATE_EPISODE_FAILED,
  DELETE_EPISODE_PENDING,
  DELETE_EPISODE_SUCCESS,
  DELETE_EPISODE_FAILED,
} from './constants';

export function updateEpisodePending(episode) {
  return {
    type: UPDATE_EPISODE_PENDING,
    episode,
  };
}

export function updateEpisodeSuccess() {
  return {
    type: UPDATE_EPISODE_SUCCESS,
  };
}

export function updateEpisodeError(error) {
  return {
    type: UPDATE_EPISODE_FAILED,
    error,
  };
}

export function deleteEpisodePending(episodeId) {
  return {
    type: DELETE_EPISODE_PENDING,
    episodeId,
  };
}

export function deleteEpisodeSuccess() {
  return {
    type: DELETE_EPISODE_SUCCESS,
  };
}

export function deleteEpisodeError(error) {
  return {
    type: DELETE_EPISODE_FAILED,
    error,
  };
}
