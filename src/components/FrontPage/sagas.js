import { call, put, takeLatest } from 'redux-saga/effects';

import { getGraphQL } from 'utils/api';
import { postFormat } from 'utils/dataFormatters';
<<<<<<< HEAD
import { frontPagePostsLoaded, frontPagePostsError } from './actions';
import { LOAD_FRONT_PAGE_POSTS_PENDING, POSTS_PER_PAGE } from './constants';
=======
import { episodeFormat } from '../../utils/dataFormatters';
>>>>>>> added newestShows in the frontpage graphql query in sagas

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
      id
      title
      showName
      publishAt
      lead
    }
  }`;
  try {
    const { data: { allPosts, highlightedPosts, newestEpisodes } } = yield call(
      getGraphQL,
      query,
    );
    const formattedPosts = allPosts.map(postFormat);
    const formattedHighlightedPosts = highlightedPosts.map(postFormat);
    const formattedNewestEpisodes = newestEpisodes.map(episodeFormat);

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
