import { call, put, takeLatest } from 'redux-saga/effects';

import { getGraphQL } from 'utils/api';
import { postFormat } from 'utils/dataFormatters';
import { frontPagePostsLoaded, frontPagePostsError } from './actions';
import { LOAD_FRONT_PAGE_POSTS_PENDING, POSTS_PER_PAGE } from './constants';
import { newestEpisodesFormat } from '../../utils/dataFormatters';

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
    allEpisodes(count: 3) {
      id,
      title,
      show {
        name
        image
      } 
      publishAt,
    }
  }`;
  try {
    const { data: { allPosts, highlightedPosts, allEpisodes, } } = yield call(
      getGraphQL,
      query,
    );
    const formattedPosts = allPosts.map(postFormat);
    const formattedHighlightedPosts = highlightedPosts.map(postFormat);
    const formattedNewestEpisodes = allEpisodes.map(newestEpisodesFormat);

    yield put(
      frontPagePostsLoaded({
        posts: formattedPosts,
        highlightedPosts: formattedHighlightedPosts,
        newestEpisodes: formattedNewestEpisodes,
      }),
    );
  } catch (error) {
    yield put(frontPagePostsError());
  }
}

export default [
  takeLatest(LOAD_FRONT_PAGE_POSTS_PENDING, loadFrontPageArticles),
];
