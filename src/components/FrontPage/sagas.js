import { call, put, takeEvery } from 'redux-saga/effects';
import { frontPagePostsLoaded, frontPagePostsError } from './actions';
import { LOAD_FRONT_PAGE_POSTS_PENDING } from './constants';
import { getGraphQL } from 'utils/api';
import { postFormat } from 'utils/dataFormatters';

// Individual exports for testing
export function* loadFrontPageArticles({ pageNumber }) {
  const query = `query {
    paginatedPosts(page: ${pageNumber}) {
      posts {
        id,
        title,
        slug,
        croppedImages {
          large,
          medium,
          small
        },
        lead,
        publishAt,
        categories {
          name,
          textColor,
          backgroundColor
        }
      }
    }
  }`;
  try {
    const result = yield call(getGraphQL, query);
    yield put(
      frontPagePostsLoaded(result.data.paginatedPosts.posts.map(postFormat)),
    );
  } catch (error) {
    yield put(frontPagePostsError());
  }
}

export function* loadFrontPageArticlesWatcher() {
  yield takeEvery(LOAD_FRONT_PAGE_POSTS_PENDING, loadFrontPageArticles);
}

// All sagas to be loaded
export default [loadFrontPageArticlesWatcher];
