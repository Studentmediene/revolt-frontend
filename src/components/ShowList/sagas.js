import { takeEvery, call, put } from 'redux-saga/effects';

import { getGraphQL } from 'utils/api';
import { LOAD_SHOWS_PENDING } from './constants';
import { showFormat } from 'utils/dataFormatters';
import { showsLoaded, showsLoadedError } from './actions';

export function* getShows() {
  console.log('fetching shows');
  const query = `query {
    allShows {
      id,
      name,
      image,
      lead,
      slug,
      archived,
      categories {
        name,
        textColor,
        backgroundColor
      }
    }
    allCategories {
      name
      textColor
      backgroundColor
    }
  }`;
  try {
    const result = yield call(getGraphQL, query);

    yield put(
      showsLoaded(
        result.data.allShows.map(showFormat),
        result.data.allCategories,
      ),
    );
  } catch (error) {
    yield put(showsLoadedError());
  }
}

export default [takeEvery(LOAD_SHOWS_PENDING, getShows)];
