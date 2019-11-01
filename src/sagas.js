import { all } from 'redux-saga/effects';

import frontPageSagas from 'components/FrontPage/sagas';
import playerSagas from 'components/Player/sagas';
import footerSagas from 'components/Footer/sagas';
import showListSagas from 'components/ShowList/sagas';
import privacyPolicySagas from 'components/PrivacyPolicy/sagas';
import sendeplanSagas from 'components/Sendeplan/sagas';
import aboutSagas from 'components/About/sagas';
import postSagas from 'components/Post/sagas';
import showSagas from 'components/Show/sagas';

export default function* rootSaga() {
  yield all([
    ...frontPageSagas,
    ...playerSagas,
    ...footerSagas,
    ...showListSagas,
    ...privacyPolicySagas,
    ...sendeplanSagas,
    ...aboutSagas,
    ...postSagas,
    ...showSagas,
  ]);
}
