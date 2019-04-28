import { call, put, takeEvery } from 'redux-saga/effects';
import { showsLoaded, showsLoadedError } from 'components/Shows/actions';
import { LOAD_SHOWS_PENDING } from './constants';
import { getGraphQL } from 'utils/api';
import { showFormat } from 'utils/dataFormatters';

// Individual exports for testing
export function* getShows() {
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
    console.log(result);

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

export function* loadShowsWatcher() {
  yield takeEvery(LOAD_SHOWS_PENDING, getShows);
}

// All sagas to be loaded
export default [loadShowsWatcher];
