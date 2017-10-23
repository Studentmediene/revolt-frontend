/*
 *
 * EpisodeAdminPicker
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import {
  selectShows,
  selectShowsLoading,
  selectShowsError,
} from 'components/Shows/selectors';

import {
  selectDigasOnDemandEpisodes,
  selectDigasPodcastEpisodes,
  selectDigasEpisodesLoading,
  selectDigasEpisodesError,
} from 'components/EpisodeAdmin/selectors';

import {
  selectShow,
  selectShowEpisodes,
  selectShowLoading,
  selectShowError,
} from 'components/Show/selectors';

import styles from './styles.css';

import { updateEpisodePending, deleteEpisodePending } from './actions';
import { loadShows } from 'components/Shows/actions';
import { loadShowById, clearShow } from 'components/Show/actions';
import {
  loadDigasEpisodesPending,
  clearDigasEpisodes,
} from 'components/EpisodeAdmin/actions';

import EpisodeForm from 'components/EpisodeForm';
import SelectInput from 'components/common/input/SelectInput';
import EpisodePreview from 'components/EpisodePreview';
import DeleteButton from 'components/common/button/DeleteButton';

// FieldChangeHandlerFactory
const getFieldChangeHandler = name =>
  function(event) {
    // eslint-disable-line func-names
    event.preventDefault();
    this.setState({ [name]: event.target.value });
  };

const getDigasEpisodeHandler = name =>
  function(event, episodes) {
    // eslint-disable-line func-names
    const digasId = event.target.value || null;
    if (digasId !== null) {
      const selectedEpisode = episodes.find(episode => episode.id == digasId); // eslint-disable-line eqeqeq
      this.setState({ [name]: selectedEpisode.url });
    } else {
      this.setState({ [name]: null });
    }
  };

export class EpisodeAdminEditor extends React.Component {
  // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      lead: '',
      podcastUrl: null,
      soundUrl: null,
      digasPodcastId: null,
      digasOndemandId: null,
      showId: null,
      selectedEpisode: null,
      selectedShow: null,
    };
  }

  componentWillMount() {
    this.props.loadShows();
    this.props.clearShow();
  }

  handleBelongingShowChange = event => {
    const showId = event.target.value || null;
    if (showId !== null) {
      // Load episodes for the selected show
      this.props.loadShowById(showId);
    } else {
      // Clear list of episodes if placeholder is selected
      this.props.clearShow();
    }
  };

  handleSelectedEpisode = event => {
    const episodeId = event.target.value || null;
    if (episodeId !== null) {
      // Load selected episode
      const selectedEpisode = this.props.episodes.find(
        episode => episode.id == episodeId,
      ); // eslint-disable-line eqeqeq
      this.setState({
        title: selectedEpisode.title,
        lead: selectedEpisode.lead,
        id: selectedEpisode.id,
        selectedEpisode,
      });
    } else {
      // Clear selected episode
      this.setState({
        title: '',
        lead: '',
        id: null,
        selectedEpisode: null,
      });
    }
  };

  handleTitleChange = getFieldChangeHandler('title').bind(this);
  handleLeadChange = getFieldChangeHandler('lead').bind(this);

  handleShowChange = event => {
    const showId = event.target.value || null;
    this.setState({ showId });
    if (showId !== null) {
      // Get the correct show by showId
      const selectedShow = this.props.shows.find(show => show.id == showId); // eslint-disable-line eqeqeq
      this.setState({
        selectedShow,
      });
      this.props.loadDigasEpisodes(selectedShow.digasId);
    } else {
      // Clear list of episodes if "Velg program" is selected
      this.setState({
        selectedShow: null,
      });
      this.props.clearDigasEpisodes();
    }
  };

  handleOnDemandEpisodeChange = getDigasEpisodeHandler('soundUrl').bind(this);
  handlePodcastEpisodeChange = getDigasEpisodeHandler('podcastUrl').bind(this);

  isValidEpisode = episode => {
    if (episode.lead.length === 0) {
      return false;
    } else if (!episode.selectedShow) {
      return false;
    } else if (!episode.podcastUrl && !episode.soundUrl) {
      return false;
    }
    return true;
  };

  handleUpdateEpisode = episode => {
    if (this.isValidEpisode(episode)) {
      this.props.onUpdateEpisode(episode);
    }
  };

  handleDeleteEpisode = () => {
    this.props.onDeleteEpisode(this.state.selectedEpisode.id);
  };

  render() {
    const arrayToOptionComponents = (array, defaultKey, defaultText) => {
      let reactComponents;
      if (array !== false && array.length > 0) {
        reactComponents = array.map(element => (
          <option value={element.id} key={element.id}>
            {element.title}
          </option>
        ));
        reactComponents.unshift(
          <option value={''} key={defaultKey}>
            {defaultText}
          </option>,
        );
        return reactComponents;
      }
      return false;
    };

    const shows = arrayToOptionComponents(
      this.props.shows,
      'show-placeholder',
      'Velg program',
    );
    const episodes = arrayToOptionComponents(
      this.props.episodes,
      'episode-placeholder',
      'Velg episode',
    );
    const digasOnDemandEpisodes = arrayToOptionComponents(
      this.props.digasOnDemandEpisodes,
      'digasOnDemandEpisode-placeholder',
      'Velg episode',
    );
    const digasPodcastEpisodes = arrayToOptionComponents(
      this.props.digasPodcastEpisodes,
      'digasOnDemandEpisode-placeholder',
      'Velg episode',
    );

    return (
      <div className={styles.episodeAdminPicker}>
        <h1>Rediger episode</h1>
        <SelectInput
          label={'Velg showet episoden tilhører'}
          onChange={this.handleBelongingShowChange}
          options={shows}
        />
        <SelectInput
          label={'Velg episoden du ønsker å endre'}
          onChange={this.handleSelectedEpisode}
          options={episodes}
        />
        {this.state.selectedEpisode ? (
          <EpisodeForm
            onTitleChange={this.handleTitleChange}
            onLeadChange={this.handleLeadChange}
            onShowChange={this.handleShowChange}
            onOnDemandEpisodeChange={event =>
              this.handleOnDemandEpisodeChange(
                event,
                this.props.digasOnDemandEpisodes,
              )}
            onPodcastEpisodeChange={event =>
              this.handlePodcastEpisodeChange(
                event,
                this.props.digasPodcastEpisodes,
              )}
            title={this.state.title}
            lead={this.state.lead}
            shows={shows}
            digasOnDemandEpisodes={digasOnDemandEpisodes}
            digasPodcastEpisodes={digasPodcastEpisodes}
            onAddButtonDisabled={!this.isValidEpisode(this.state)}
            onAddEpisode={() => this.handleUpdateEpisode(this.state)}
          />
        ) : (
          <div />
        )}
        {this.state.selectedEpisode ? (
          <div className={styles.previewSection}>
            <EpisodePreview
              showName={this.props.show ? this.props.show.title : null}
              lead={this.state.lead}
            />
          </div>
        ) : (
          <div />
        )}
        {this.state.selectedEpisode ? (
          <DeleteButton
            onClick={this.handleDeleteEpisode}
            confirmText={'Er du sikker på at du vil slette episoden?'}
          >
            SLETT
          </DeleteButton>
        ) : (
          <div />
        )}
      </div>
    );
  }
}

EpisodeAdminEditor.propTypes = {
  shows: React.PropTypes.oneOfType([
    React.PropTypes.bool,
    React.PropTypes.array,
  ]).isRequired,
  show: React.PropTypes.oneOfType([
    React.PropTypes.bool,
    React.PropTypes.object,
  ]).isRequired,
  episodes: React.PropTypes.oneOfType([
    React.PropTypes.bool,
    React.PropTypes.array,
  ]).isRequired,
  digasOnDemandEpisodes: React.PropTypes.oneOfType([
    React.PropTypes.bool,
    React.PropTypes.array,
  ]).isRequired,
  digasPodcastEpisodes: React.PropTypes.oneOfType([
    React.PropTypes.bool,
    React.PropTypes.array,
  ]).isRequired,
  onUpdateEpisode: React.PropTypes.func.isRequired,
  onDeleteEpisode: React.PropTypes.func.isRequired,
  loadShows: React.PropTypes.func.isRequired,
  loadShowById: React.PropTypes.func.isRequired,
  clearShow: React.PropTypes.func.isRequired,
  loadDigasEpisodes: React.PropTypes.func.isRequired,
  clearDigasEpisodes: React.PropTypes.func.isRequired,
  digasEpisodesLoading: React.PropTypes.bool.isRequired,
  digasEpisodesError: React.PropTypes.bool.isRequired,
};

EpisodeAdminEditor.defaultProps = {
  loading: false,
  error: false,
  shows: false,
  episodes: false,
  digasOnDemandEpisodes: false,
  digasPodcastEpisodes: false,
};

const mapStateToProps = createStructuredSelector({
  shows: selectShows(),
  show: selectShow(),
  episodes: selectShowEpisodes(),
  episodeLoading: selectShowLoading(),
  episodeError: selectShowError(),
  loading: selectShowsLoading(),
  error: selectShowsError(),
  digasOnDemandEpisodes: selectDigasOnDemandEpisodes(),
  digasPodcastEpisodes: selectDigasPodcastEpisodes(),
  digasEpisodesLoading: selectDigasEpisodesLoading(),
  digasEpisodesError: selectDigasEpisodesError(),
});

const mapDispatchToProps = dispatch => ({
  loadShows: () => dispatch(loadShows()),
  loadShowById: id => dispatch(loadShowById(id)),
  clearShow: () => dispatch(clearShow()),
  loadDigasEpisodes: digasId => dispatch(loadDigasEpisodesPending(digasId)),
  clearDigasEpisodes: () => dispatch(clearDigasEpisodes()),
  onUpdateEpisode: episode => dispatch(updateEpisodePending(episode)),
  onDeleteEpisode: episodeId => dispatch(deleteEpisodePending(episodeId)),
  dispatch,
});

export default connect(mapStateToProps, mapDispatchToProps)(EpisodeAdminEditor);
