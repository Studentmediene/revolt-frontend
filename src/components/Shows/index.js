import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';

import { loadShows } from './actions';
import Loader from 'components/Loader';
import ShowPreviewList from './ShowPreviewList';
import {
  selectShows,
  selectShowsLoading,
  selectShowsError,
  selectCategories,
} from './selectors';
import styles from './styles.scss';
import Checkbox from './CheckBox';
import { FadeLoader } from 'react-spinners';

export class Shows extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showArchivedShows: false,
      filteredShows: [],
      selectedCategories: {},
    };
    this.createCheckbox = this.createCheckbox.bind(this);
    this.createCheckboxes = this.createCheckboxes.bind(this);
    this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
    this.filterCategory = this.filterCategory.bind(this);
    this.toggleArchivedShows = this.toggleArchivedShows.bind(this);
  }

  handleCheckboxChange = changeEvent => {
    const { name } = changeEvent.target;
    this.setState(
      prevState => ({
        selectedCategories: {
          ...prevState.selectedCategories,
          [name]: !prevState.selectedCategories[name],
        },
      }),
      this.filterCategory,
    );
  };

  createCheckbox = category => (
    <Checkbox
      label={category.name}
      isSelected={this.state.selectedCategories[category.name] || false}
      onCheckboxChange={this.handleCheckboxChange}
      key={category.name}
    />
  );

  createCheckboxes() {
    if (this.props.categories && this.props.categories.length > 0) {
      return this.props.categories
        .sort((a, b) => a.name.localeCompare(b.name))
        .map(this.createCheckbox);
    }
  }

  componentWillMount() {
    this.props.loadShows();
  }

  toggleArchivedShows(event) {
    event.preventDefault();
    this.setState(prevState => ({
      showArchivedShows: !prevState.showArchivedShows,
    }));
  }

  filterCategory() {
    let list = [];
    let activeOptions = Object.keys(this.state.selectedCategories).filter(
      key => this.state.selectedCategories[key],
    );
    for (let i of this.props.shows) {
      for (let k of activeOptions) {
        if (
          i.categories &&
          i.categories.length > 0 &&
          k == i.categories[0].name
        ) {
          list.push(i);
          break;
        }
      }
    }
    this.setState({
      filteredShows: list,
    });
  }

  render() {
    let showPreviewList = null;
    let showsToDisplay = this.state.filteredShows;

    if (showsToDisplay.length === 0) {
      showsToDisplay = this.props.shows;
    }

    if (this.props.shows !== false) {
      showPreviewList = (
        <ShowPreviewList
          shows={showsToDisplay}
          showArchivedShows={this.state.showArchivedShows}
          toggleArchivedShows={this.toggleArchivedShows}
        />
      );
    } else {
      return <Loader />;
    }

    return (
      <div>
        <div className={styles.container}>{this.createCheckboxes()}</div>

        <React.Fragment>{showPreviewList}</React.Fragment>
      </div>
    );
  }
}

Shows.propTypes = {
  loadShows: PropTypes.func,
  loading: PropTypes.bool,
  error: PropTypes.bool,
  shows: PropTypes.oneOfType([PropTypes.bool, PropTypes.array]),
  categories: PropTypes.oneOfType([PropTypes.bool, PropTypes.array]),
};

Shows.defaultProps = {
  loading: false,
  error: false,
  shows: [],
};

const mapStateToProps = createStructuredSelector({
  shows: selectShows(),
  categories: selectCategories(),
  loading: selectShowsLoading(),
  error: selectShowsError(),
});

function mapDispatchToProps(dispatch) {
  return {
    loadShows: () => dispatch(loadShows()),
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Shows));
