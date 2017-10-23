import {
  ADD_EPISODE_PENDING,
  ADD_EPISODE_SUCCESS,
  ADD_EPISODE_FAILED,
  LOAD_DIGAS_EPISODES_PENDING,
  LOAD_DIGAS_EPISODES_SUCCESS,
  LOAD_DIGAS_EPISODES_FAILED,
  CLEAR_DIGAS_EPISODES,
} from './constants';

export function addEpisodePending(episode) {
  return {
    type: ADD_EPISODE_PENDING,
    episode,
  };
}

export function addEpisodeSuccess() {
  return {
    type: ADD_EPISODE_SUCCESS,
  };
}

export function addEpisodeError(error) {
  return {
    type: ADD_EPISODE_FAILED,
    error,
  };
}

export function loadDigasEpisodesPending(digasId) {
  return {
    type: LOAD_DIGAS_EPISODES_PENDING,
    digasId,
  };
}

export function loadDigasEpisodesSuccess(digasEpisodes) {
  return {
    type: LOAD_DIGAS_EPISODES_SUCCESS,
    digasEpisodes,
  };
}

export function loadDigasEpisodesError(error) {
  return {
    type: LOAD_DIGAS_EPISODES_FAILED,
    error,
  };
}

export function clearDigasEpisodes() {
  return {
    type: CLEAR_DIGAS_EPISODES,
  };
}
