import { take, call, put } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import {
  ADD_SHOW_PENDING,
  LOAD_DIGAS_SHOWS_PENDING,
  LOAD_DIGAS_PODCASTURL_PENDING,
} from './constants';
import {
  addShowSuccess,
  addShowError,
  loadDigasShowsSuccess,
  loadDigasShowsError,
  loadDigasPodcastUrlSuccess,
  loadDigasPodcastUrlError,
} from './actions';
import {
  post,
  get,
  getPodcastUrl,
  SHOWS_URL,
  PAPPAGORG_SHOWS_URL,
} from 'utils/api';

export function* addShow(show) {
  try {
    const result = yield call(post, SHOWS_URL, show);
    yield put(addShowSuccess(result));
    yield put(push('/admin'));
  } catch (error) {
    yield put(addShowError());
  }
}

export function* addShowWatcher() {
  // eslint-disable-next-line no-constant-condition
  while (true) {
    const { show } = yield take(ADD_SHOW_PENDING);
    yield call(addShow, show);
  }
}

export function* getDigasShows() {
  try {
    const result = yield get(PAPPAGORG_SHOWS_URL);
    yield put(loadDigasShowsSuccess(result));
  } catch (error) {
    yield put(loadDigasShowsError());
  }
}

export function* getDigasShowsWatcher() {
  while (yield take(LOAD_DIGAS_SHOWS_PENDING)) {
    yield call(getDigasShows);
  }
}

export function* getDigasPodcastUrl(showId) {
  try {
    const result = yield call(getPodcastUrl, showId);
    yield put(loadDigasPodcastUrlSuccess(result));
  } catch (error) {
    yield put(loadDigasPodcastUrlError());
  }
}

export function* getDigasPodcastUrlWatcher() {
  // eslint-disable-next-line no-constant-condition
  while (true) {
    const { showId } = yield take(LOAD_DIGAS_PODCASTURL_PENDING);
    yield call(getDigasPodcastUrl, showId);
  }
}
// All sagas to be loaded
export default [
  addShowWatcher,
  getDigasShowsWatcher,
  getDigasPodcastUrlWatcher,
];
