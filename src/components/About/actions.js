import {
  LOAD_ABOUT_PENDING,
  LOAD_ABOUT_SUCCESS,
  LOAD_ABOUT_FAILED,
} from './constants';

export function loadAbout() {
  return {
    type: LOAD_ABOUT_PENDING,
  };
}

export function aboutLoaded(about) {
  return {
    type: LOAD_ABOUT_SUCCESS,
    about,
  };
}

export function aboutError() {
  return {
    type: LOAD_ABOUT_FAILED,
  };
}
