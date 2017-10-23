import { take, call, put } from 'redux-saga/effects';
import { LOAD_SHOW_PENDING } from './constants';
import { showLoaded, showError } from './actions';
import { getGraphQL } from 'utils/api';
import { showFormat, episodeFormat, postFormat } from 'utils/dataFormatters';

const formatShowQuery = ({ episodes, posts, ...show }) => ({
  show: showFormat(show),
  episodes: episodes.map(episodeFormat),
  posts: posts.map(postFormat),
});

// Individual exports for testing
export function* loadShow(slug) {
  const query = `query {
    show(slug:"${slug}") {
      id,
      name,
      image,
      content,
      archived,
      episodes {
        id,
        lead,
        createdAt,
      },
      posts {
        id,
        title,
        slug,
        image,
        publishAt,
        lead,
        createdBy {
          fullName
        }
      }
    }
  }`;
  try {
    let result = yield call(getGraphQL, query);
    yield put(showLoaded(formatShowQuery(result.data.show)));
  } catch (error) {
    yield put(showError());
  }
}

export function* loadShowWatcher() {
  // eslint-disable-next-line no-constant-condition
  while (true) {
    const { slug } = yield take(LOAD_SHOW_PENDING);
    yield call(loadShow, slug);
  }
}

// All sagas to be loaded
export default [loadShowWatcher];
