import { takeEvery, call, put } from 'redux-saga/effects';

import { getGraphQL } from 'utils/api';
import { LOAD_POST_PENDING } from './constants';
import { postLoaded, postError } from './actions';
import { postFormat } from 'utils/dataFormatters';

export function* loadPost({ slug }) {
  console.log('fetching post', slug);
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
      },
      categories{
        name,
        textColor,
        backgroundColor
      },
      episodes {
        id,
        title,
        lead,
        publishAt,
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

export default [takeEvery(LOAD_POST_PENDING, loadPost)];
