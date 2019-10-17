import { call, put, takeEvery } from 'redux-saga/effects';

import { getGraphQL } from 'utils/api';
import { postFormat } from 'utils/dataFormatters';
import { frontPagePostsLoaded, frontPagePostsError } from './actions';
import { LOAD_FRONT_PAGE_POSTS_PENDING, POSTS_PER_PAGE } from './constants';

export function* loadFrontPageArticles({ postOffset }) {
  console.log('fetching frontpage');
  const query = `query {
    allPosts(offset: ${postOffset}, count: ${POSTS_PER_PAGE}) {
      id,
      title,
      slug,
      croppedImages {
        large,
        medium,
        small
      },
      publishAt,
      categories {
        name,
        textColor,
        backgroundColor
      }
    }
    highlightedPosts {
      id,
      title,
      slug,
      croppedImages {
        large,
        medium,
        small
      },
    }
  }`;
  try {
    const {
      data: { allPosts, highlightedPosts },
    } = yield call(getGraphQL, query);
    const formattedPosts = allPosts.map(postFormat);
    const formattedHighlightedPosts = highlightedPosts.map(postFormat);

    yield put(
      frontPagePostsLoaded({
        posts: formattedPosts,
        highlightedPosts: formattedHighlightedPosts,
      }),
    );
  } catch (error) {
    yield put(frontPagePostsError());
  }
}

export default [
  takeEvery(LOAD_FRONT_PAGE_POSTS_PENDING, loadFrontPageArticles),
];
