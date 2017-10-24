/*
 *
 * ShowAdmin
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import {
  selectDigasShows,
  selectDigasShowsLoading,
  selectDigasShowsError,
  selectDigasPodcastUrl,
  selectDigasPodcastUrlLoading,
  selectDigasPodcastUrlError,
} from './selectors';
import {
  addShowPending,
  loadDigasPodcastUrlPending,
  clearDigasPodcastUrl,
  loadDigasShowsPending,
} from './actions';
import styles from './styles.css';

import ShowForm from 'components/ShowForm';

// FieldChangeHandlerFactory
const getFieldChangeHandler = name =>
  function(event) {
    // eslint-disable-line func-names
    event.preventDefault();
    this.setState({ [name]: event.target.value });
  };

export class ShowAdmin extends React.Component {
  // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      description: '',
      logoImageUrl: null,
      lead: '',
      explicitContent: false,
      archived: false,
      language: 'no',
      digasId: null,
    };
  }

  componentWillMount() {
    this.props.loadDigasShows();
  }

  handleTitleChange = getFieldChangeHandler('title').bind(this);
  handleLeadChange = getFieldChangeHandler('lead').bind(this);
  handleDescriptionChange = getFieldChangeHandler('description').bind(this);
  handleLanguageChange = getFieldChangeHandler('language').bind(this);

  handleImageChange = event => {
    event.preventDefault();

    const reader = new FileReader();
    const file = event.target.files[0];

    reader.onloadend = () => {
      this.setState({
        file,
        imagePreviewUrl: reader.result,
      });
    };
    reader.readAsDataURL(file);
  };

  handleDigasIdChange = event => {
    const digasId = event.target.value || null;
    this.setState({ digasId });
    if (digasId !== null) {
      this.props.dispatchDigasIdChange(digasId);
    } else {
      this.props.clearDigasPodcastUrl();
    }
  };

  handleArchivedChange = () => {
    this.setState({ archived: !this.state.archived });
  };

  handleExplicitContentChange = () => {
    this.setState({ explicitContent: !this.state.explicitContent });
  };

  handleAddShow = event => {
    event.preventDefault();
    this.props.onAddShow({
      podcastRssFeedUrl: this.props.digasPodcastUrl,
      ...this.state,
    });
  };

  render() {
    let digasShows = false;
    if (this.props.digasShows !== false && this.props.digasShows.length > 0) {
      digasShows = this.props.digasShows.map(show => (
        <option value={show.id} key={show.id}>
          {show.name}
        </option>
      ));
      digasShows.unshift(
        <option value={''} key={'digasShow-placeholder'}>
          Velg show
        </option>,
      );
    }

    return (
      <div className={styles.wrapper}>
        <h1>Opprett nytt program</h1>
        <ShowForm
          onTitleChange={this.handleTitleChange}
          onImageChange={this.handleImageChange}
          onLeadChange={this.handleLeadChange}
          onDescriptionChange={this.handleDescriptionChange}
          onDigasIdChange={this.handleDigasIdChange}
          onLanguageChange={this.handleLanguageChange}
          onArchivedChange={this.handleArchivedChange}
          onExplicitContentChange={this.handleExplicitContentChange}
          onAddShow={this.handleAddShow}
          title={this.state.title}
          lead={this.state.lead}
          description={this.state.description}
          digasIdOptions={digasShows}
          archived={this.state.archived}
          explicitContent={this.state.explicitContent}
        />
      </div>
    );
  }
}

ShowAdmin.propTypes = {
  onAddShow: React.PropTypes.func.isRequired,
  dispatchDigasIdChange: React.PropTypes.func.isRequired,
  clearDigasPodcastUrl: React.PropTypes.func.isRequired,
  loadDigasShows: React.PropTypes.func.isRequired,
  digasPodcastUrl: React.PropTypes.string,
  digasLoading: React.PropTypes.bool,
  digasError: React.PropTypes.bool,
  digasShows: React.PropTypes.oneOfType([
    React.PropTypes.bool,
    React.PropTypes.array,
  ]),
};

ShowAdmin.defaultProps = {
  addShowLoading: false,
  addShowError: false,
  digasLoading: false,
  digasError: false,
  digasShows: [],
};

const mapStateToProps = createStructuredSelector({
  digasShows: selectDigasShows(),
  digasShowsLoading: selectDigasShowsLoading(),
  digasShowsError: selectDigasShowsError(),
  digasPodcastUrl: selectDigasPodcastUrl(),
  digasPodcastUrlLoading: selectDigasPodcastUrlLoading(),
  digasPodcastUrlError: selectDigasPodcastUrlError(),
});

function mapDispatchToProps(dispatch) {
  return {
    onAddShow: show => dispatch(addShowPending(show)),
    dispatchDigasIdChange: showId =>
      dispatch(loadDigasPodcastUrlPending(showId)),
    clearDigasPodcastUrl: () => dispatch(clearDigasPodcastUrl()),
    loadDigasShows: () => dispatch(loadDigasShowsPending()),
  };
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ShowAdmin),
);
