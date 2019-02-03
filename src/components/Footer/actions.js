import {
  LOAD_FOOTER_PENDING,
  LOAD_FOOTER_SUCCESS,
  LOAD_FOOTER_FAILED,
} from './constants';

export function loadFooter() {
  return {
    type: LOAD_FOOTER_PENDING,
  };
}

export function footerLoaded({ chiefEditor, radioEditor, musicProducer }) {
  return {
    type: LOAD_FOOTER_SUCCESS,
    chiefEditor,
    radioEditor,
    musicProducer,
  };
}

export function footerError() {
  return {
    type: LOAD_FOOTER_FAILED,
  };
}
