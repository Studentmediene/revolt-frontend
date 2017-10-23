import { take, call, put } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import { ADD_EPISODE_PENDING, LOAD_DIGAS_EPISODES_PENDING } from './constants';
import {
  addEpisodeSuccess,
  addEpisodeError,
  loadDigasEpisodesSuccess,
  loadDigasEpisodesError,
} from './actions';
import {
  post,
  EPISODES_URL,
  getDigasOnDemandEpisodes,
  getDigasPodcastEpisodes,
} from 'utils/api';

export function* addEpisode(episode) {
  try {
    yield call(post, EPISODES_URL, episode);
    yield put(addEpisodeSuccess());
    yield put(push('/admin'));
  } catch (error) {
    yield put(addEpisodeError());
  }
}

export function* addEpisodeWatcher() {
  // eslint-disable-next-line no-constant-condition
  while (true) {
    const { episode } = yield take(ADD_EPISODE_PENDING);
    yield call(addEpisode, episode);
  }
}

export function* loadDigasEpisodes(digasId) {
  try {
    const onDemandEpisodes = yield call(getDigasOnDemandEpisodes, digasId);
    const podcastEpisodes = yield call(getDigasPodcastEpisodes, digasId);
    yield put(
      loadDigasEpisodesSuccess({
        onDemandEpisodes,
        podcastEpisodes,
      }),
    );
  } catch (error) {
    yield put(loadDigasEpisodesError());
  }
}

export function* loadDigasEpisodesWatcher() {
  // eslint-disable-next-line no-constant-condition
  while (true) {
    const { digasId } = yield take(LOAD_DIGAS_EPISODES_PENDING);
    yield call(loadDigasEpisodes, digasId);
  }
}

// All sagas to be loaded
export default [addEpisodeWatcher, loadDigasEpisodesWatcher];
