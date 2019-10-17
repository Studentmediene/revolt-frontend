import { spawn, call, delay, all, takeEvery } from 'redux-saga/effects';

import frontPageSagas from 'components/FrontPage/sagas';
//import playerSagas from 'components/Player/sagas';
import footerSagas from 'components/Footer/sagas';
import aboutSagas from 'components/About/sagas';

const makeRestartable = saga => {
  return function*() {
    yield spawn(function*() {
      while (true) {
        try {
          yield call(saga);
          console.error(
            'unexpected root saga termination. The root sagas are supposed to be sagas that live during the whole app lifetime!',
            saga,
          );
        } catch (e) {
          console.error('Saga error, the saga will be restarted', e);
        }
        yield delay(1000); // Workaround to avoid infinite error loops
      }
    });
  };
};

export default function* rootSaga() {
  yield all([...footerSagas, ...aboutSagas, ...frontPageSagas]);
}
