import {
  LOAD_SHOWS_PENDING,
  LOAD_SHOWS_SUCCESS,
  LOAD_SHOWS_FAILED,
} from './constants';

export function loadShows() {
  return {
    type: LOAD_SHOWS_PENDING,
  };
}

export function showsLoaded(shows, categories) {
  return {
    type: LOAD_SHOWS_SUCCESS,
    shows,
    categories,
  };
}

export function showsLoadedError() {
  return {
    type: LOAD_SHOWS_FAILED,
  };
}
