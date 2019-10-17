import { combineReducers } from 'redux-immutable';

import aboutReducer from 'components/About/reducer';
import playerReducer from 'components/Player/reducer';
import footerReducer from 'components/Footer/reducer';
import frontPageReducer from 'components/FrontPage/reducer';
import privacyPolicyReducer from 'components/PrivacyPolicy/reducer';

export default function createReducer() {
  return combineReducers({
    player: playerReducer,
    footer: footerReducer,
    frontPage: frontPageReducer,
    privacyPolicy: privacyPolicyReducer,
    about: aboutReducer,
  });
}
