import {
  LOAD_SHOW_PENDING,
  LOAD_SHOW_SUCCESS,
  LOAD_SHOW_FAILED,
  CLEAR_SHOW,
} from './constants';

export function loadShow(slug) {
  return {
    type: LOAD_SHOW_PENDING,
    slug,
  };
}

export function showLoaded(show, slug) {
  return {
    type: LOAD_SHOW_SUCCESS,
    show,
    slug,
  };
}

export function showError() {
  return {
    type: LOAD_SHOW_FAILED,
  };
}
