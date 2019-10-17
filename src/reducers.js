import { combineReducers } from 'redux-immutable';

import aboutReducer from 'components/About/reducer';
import playerReducer from 'components/Player/reducer';
import footerReducer from 'components/Footer/reducer';
import sendeplanReducer from 'components/Sendeplan/reducer';
import frontPageReducer from 'components/FrontPage/reducer';
import privacyPolicyReducer from 'components/PrivacyPolicy/reducer';

export default function createReducer() {
  return combineReducers({
    player: playerReducer,
    footer: footerReducer,
    sendeplan: sendeplanReducer,
    frontPage: frontPageReducer,
    privacyPolicy: privacyPolicyReducer,
    about: aboutReducer,
  });
}
