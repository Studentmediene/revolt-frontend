import { fromJS } from 'immutable';
import {
  LOAD_FOOTER_PENDING,
  LOAD_FOOTER_SUCCESS,
  LOAD_FOOTER_FAILED,
} from './constants';

const initialState = fromJS({
  chiefEditor: '',
  radioEditor: '',
  musicProducer: '',
  loading: false,
  error: false,
});

function footerReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_FOOTER_PENDING:
      return state.set('loading', true).set('error', false);
    case LOAD_FOOTER_SUCCESS:
      return state
        .set('loading', false)
        .set('error', false)
        .set('chiefEditor', action.chiefEditor)
        .set('radioEditor', action.radioEditor)
        .set('musicProducer', action.musicProducer);
    case LOAD_FOOTER_FAILED:
      return state.set('loading', false).set('error', true);
    default:
      return state;
  }
}

export default footerReducer;
