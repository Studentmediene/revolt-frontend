import { all } from 'redux-saga/effects';

import frontPageSagas from 'components/FrontPage/sagas';
//import playerSagas from 'components/Player/sagas';
import footerSagas from 'components/Footer/sagas';
import privacyPolicySagas from 'components/PrivacyPolicy/sagas';
import sendeplanSagas from 'components/Sendeplan/sagas';
import aboutSagas from 'components/About/sagas';

export default function* rootSaga() {
  yield all([
    ...frontPageSagas,
    ...footerSagas,
    ...privacyPolicySagas,
    ...sendeplanSagas,
    ...aboutSagas,
  ]);
}
