import { combineReducers } from 'redux-immutable';

import aboutReducer from 'components/About/reducer';
import playerReducer from 'components/Player/reducer';
import footerReducer from 'components/Footer/reducer';
import showListReducer from 'components/ShowList/reducer';
import postReducer from 'components/Post/reducer';
import showReducer from 'components/Show/reducer';
import sendeplanReducer from 'components/Sendeplan/reducer';
import frontPageReducer from 'components/FrontPage/reducer';
import privacyPolicyReducer from 'components/PrivacyPolicy/reducer';

export default function createReducer() {
  return combineReducers({
    player: playerReducer,
    footer: footerReducer,
    showList: showListReducer,
    post: postReducer,
    show: showReducer,
    sendeplan: sendeplanReducer,
    frontPage: frontPageReducer,
    privacyPolicy: privacyPolicyReducer,
    about: aboutReducer,
  });
}
