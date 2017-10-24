/*
 *
 * Shows actions
 *
 */

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

export function showsLoaded(shows) {
  return {
    type: LOAD_SHOWS_SUCCESS,
    shows,
  };
}

export function showsLoadedError() {
  return {
    type: LOAD_SHOWS_FAILED,
  };
}
