import { take, call, put } from 'redux-saga/effects';
import { LOAD_POST_PENDING } from './constants';
import { postLoaded, postError } from './actions';
import { getGraphQL } from 'utils/api';
import { postFormat } from 'utils/dataFormatters';

// Individual exports for testing
export function* loadPost(slug) {
  const query = `query {
    post(slug:"${slug}") {
      id,
      title,
      content,
      publishAt,
      createdBy {
        fullName
      },
      show{
        name,
        slug
      }
    }
  }`;
  try {
    const result = yield call(getGraphQL, query);
    yield put(postLoaded(postFormat(result.data.post)));
  } catch (error) {
    yield put(postError());
  }
}

export function* loadPostWatcher() {
  // eslint-disable-next-line no-constant-condition
  while (true) {
    const { slug } = yield take(LOAD_POST_PENDING);
    yield call(loadPost, slug);
  }
}

// All sagas to be loaded
export default [loadPostWatcher];
