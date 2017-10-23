/*
 *
 * EpisodeAdmin reducer
 *
 */

import { fromJS } from 'immutable';
import {
  ADD_EPISODE_PENDING,
  ADD_EPISODE_SUCCESS,
  ADD_EPISODE_FAILED,
  LOAD_DIGAS_EPISODES_PENDING,
  LOAD_DIGAS_EPISODES_SUCCESS,
  LOAD_DIGAS_EPISODES_FAILED,
  CLEAR_DIGAS_EPISODES,
} from './constants';

const initialState = fromJS({
  addEpisodeLoading: false,
  addEpisodeError: false,
  digasOnDemandEpisodes: false,
  digasPodcastEpisodes: false,
  digasLoading: false,
  digasError: false,
});

function episodeAdminReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_EPISODE_PENDING:
      return state.set('addEpisodeLoading', true).set('addEpisodeError', false);
    case ADD_EPISODE_SUCCESS:
      return state
        .set('addEpisodeLoading', false)
        .set('addEpisodeError', false);
    case ADD_EPISODE_FAILED:
      return state.set('addEpisodeLoading', false).set('addEpisodeError', true);
    case LOAD_DIGAS_EPISODES_PENDING:
      return state
        .set('digasLoading', true)
        .set('digasError', false)
        .set('digasOnDemandEpisodes', false)
        .set('digasPodcastEpisodes', false);
    case LOAD_DIGAS_EPISODES_SUCCESS:
      return state
        .set('digasLoading', false)
        .set('digasOnDemandEpisodes', action.digasEpisodes.onDemandEpisodes)
        .set('digasPodcastEpisodes', action.digasEpisodes.podcastEpisodes);
    case LOAD_DIGAS_EPISODES_FAILED:
      return state.set('digasLoading', false).set('digasError', true);
    case CLEAR_DIGAS_EPISODES:
      return state
        .set('digasOnDemandEpisodes', false)
        .set('digasPodcastEpisodes', false);
    default:
      return state;
  }
}

export default episodeAdminReducer;
