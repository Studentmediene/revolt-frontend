import { take, call, put, fork, cancel } from 'redux-saga/effects';

import {
  GET_PODCAST_PLAYLIST_PENDING,
  GET_ON_DEMAND_PLAYLIST_PENDING,
  PLAY_LIVE,
  PAUSE_LIVE,
} from './constants';
import {
  podcastPlaylistLoaded,
  podcastPlaylistError,
  onDemandPlaylistLoaded,
  onDemandPlaylistError,
  currentShowTitle,
} from './actions';
import { getGraphQL, getCurrentShows } from 'utils/api';
// Individual exports for testing
export function* playPodcast(episodeId, offset) {
  const query = `query {
    episode(id:${episodeId}) {
      id,
      show {
        name,
        episodes {
          id,
          title,
          podcastUrl
        }
      }
    }
  }`;
  try {
    const graphQlRes = yield call(getGraphQL, query);
    const episode = graphQlRes.data.episode;
    const episodes = episode.show.episodes;
    const playlist = [];
    let index = 0;

    for (let i = episodes.length - 1; i >= 0; i--) {
      playlist.push({
        title: episodes[i].title,
        show: episode.show.name,
        url: episodes[i].podcastUrl,
      });
      if (episodes[i].id === episode.id) {
        index = episodes.length - 1 - i;
      }
    }
    yield put(podcastPlaylistLoaded(playlist, index, offset));
  } catch (error) {
    yield put(podcastPlaylistError());
  }
}

export function* playOnDemand(episodeId, offset) {
  const query = `query {
    episode(id:${episodeId}) {
      id,
      show {
        name,
        episodes {
          id,
          title,
          onDemandUrl
        }
      }
    }
  }`;

  try {
    const graphQlRes = yield call(getGraphQL, query);
    const episode = graphQlRes.data.episode;
    const playlist = episode.show.episodes
      .map(e => ({
        id: e.id,
        title: e.title,
        show: episode.show.name,
        url: e.onDemandUrl,
      }))
      .reverse();

    const index = playlist.indexOf(playlist.find(e => e.id === episode.id));

    yield put(onDemandPlaylistLoaded(playlist, index, offset));
  } catch (error) {
    yield put(onDemandPlaylistError());
  }
}

function* updateLiveTitle() {
  const currentShow = yield call(getCurrentShows);
  const liveTitle = currentShow.current.title;
  yield put(currentShowTitle(liveTitle));
}

function* updateLiveTitleTimer() {
  const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
  while (true) {
    yield call(updateLiveTitle);
    yield call(delay, 10000);
  }
}

function* playLive() {
  while (yield take(PLAY_LIVE)) {
    const bgSyncTask = yield fork(updateLiveTitleTimer);
    yield take(PAUSE_LIVE);
    yield cancel(bgSyncTask);
  }
}

export function* playPodcastWatcher() {
  // eslint-disable-next-line no-constant-condition
  while (true) {
    const { episodeId, offset } = yield take(GET_PODCAST_PLAYLIST_PENDING);
    yield call(playPodcast, episodeId, offset);
  }
}

export function* playOnDemandWatcher() {
  // eslint-disable-next-line no-constant-condition
  while (true) {
    const { episodeId, offset } = yield take(GET_ON_DEMAND_PLAYLIST_PENDING);
    yield call(playOnDemand, episodeId, offset);
  }
}

// All sagas to be loaded
export default [playPodcastWatcher, playOnDemandWatcher, playLive];
