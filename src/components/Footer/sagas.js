import { call, put, takeEvery } from 'redux-saga/effects';

import { getGraphQL } from 'utils/api';
import { LOAD_FOOTER_PENDING } from './constants';
import { footerLoaded, footerError } from './actions';

export function* loadFooter() {
  console.log('fetching footer');
  const query = `query {
    settings {
      chiefEditor,
      radioEditor,
      musicProducer,
      culturalProducer,
      entertainmentProducer
    }
  }`;
  try {
    const {
      data: {
        settings: { chiefEditor, radioEditor, musicProducer, culturalProducer, entertainmentProducer },
      },
    } = yield call(getGraphQL, query);
    yield put(
      footerLoaded({
        chiefEditor,
        radioEditor,
        musicProducer,
        culturalProducer,
        entertainmentProducer,
      }),
    );
  } catch (error) {
    yield put(footerError());
  }
}

// All sagas to be loaded
export default [takeEvery(LOAD_FOOTER_PENDING, loadFooter)];
