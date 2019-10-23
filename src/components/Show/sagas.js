import { takeEvery, call, put } from 'redux-saga/effects';

import { getGraphQL } from 'utils/api';
import { LOAD_SHOW_PENDING } from './constants';
import { showLoaded, showError } from './actions';
import { showFormat, episodeFormat, postFormat } from 'utils/dataFormatters';

const formatShowQuery = ({ episodes, posts, ...show }) => ({
  show: showFormat(show),
  episodes: episodes.map(episodeFormat),
  posts: posts.map(postFormat),
});

export function* loadShow({ slug }) {
  console.log('fetching show', slug);
  const query = `query {
    show(slug:"${slug}") {
      id,
      name,
      image,
      content,
      lead,
      archived,
      episodes {
        id,
        title,
        lead,
        publishAt,
      },
      categories {
        name,
        textColor,
        backgroundColor
      },
      posts {
        id,
        title,
        slug,
        croppedImages {
          large,
          medium,
          small
        },
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
    yield put(showLoaded(formatShowQuery(result.data.show), slug));
  } catch (error) {
    yield put(showError());
  }
}

export default [takeEvery(LOAD_SHOW_PENDING, loadShow)];
