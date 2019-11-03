import React from 'react';
import PropTypes from 'prop-types';
import { fromJS } from 'immutable';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import styles from './styles.scss';

import Checkbox from './CheckBox';
import { loadShows } from './actions';
import Loader from 'components/Loader';
import ShowPreviewList from './ShowPreviewList';
import {
  selectShows,
  selectShowsLoading,
  selectShowsError,
  selectCategories,
} from './selectors';

export class Shows extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showArchivedShows: false,
      filteredShows: [],
      selectedCategories: {},
    };
    this.toggleArchivedShows = this.toggleArchivedShows.bind(this);
    this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
    this.filterCategory = this.filterCategory.bind(this);
  }

  static propTypes = {
    loading: PropTypes.bool,
    error: PropTypes.bool,
    shows: PropTypes.oneOfType([
      PropTypes.array,
      PropTypes.object,
      PropTypes.bool,
    ]),
    categories: PropTypes.oneOfType([
      PropTypes.array,
      PropTypes.object,
      PropTypes.bool,
    ]),
  };

  static async getInitialProps({ store }) {
    if (!selectShows()(store.getState())) {
      store.dispatch(loadShows());
    }
    return {};
  }

  handleCheckboxChange = event => {
    const { name } = event.target;
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
    for (let i of fromJS(this.props.shows).toJS()) {
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
    if (this.props.loading) {
      return <Loader />;
    } else if (this.props.error) {
      return <div>Kunne ikke laste inn programmene.</div>;
    } else {
      let showPreviewList;
      let categoryList;
      const shows = fromJS(this.props.shows).toJS();
      let showsToDisplay = this.state.filteredShows;

      if (showsToDisplay.length === 0) {
        showsToDisplay = shows;
      }

      const categories = fromJS(this.props.categories).toJS();

      if (showsToDisplay.length > 0) {
        showPreviewList = (
          <ShowPreviewList
            shows={showsToDisplay}
            showArchivedShows={this.state.showArchivedShows}
            toggleArchivedShows={this.toggleArchivedShows}
            compact={true}
          />
        );
      }

      if (categories.length > 0) {
        categoryList = categories
          .sort((a, b) => a.name.localeCompare(b.name))
          .map(category => (
            <Checkbox
              label={category.name}
              backgroundColor={category.backgroundColor}
              textColor={category.textColor}
              isSelected={this.state.selectedCategories[category.name] || false}
              onCheckboxChange={this.handleCheckboxChange}
              key={category.name}
            />
          ));
      }
      return (
        <React.Fragment>
          <div className={styles.container}>{categoryList}</div>
          {showPreviewList}
        </React.Fragment>
      );
    }
  }
}

const mapStateToProps = createStructuredSelector({
  shows: selectShows(),
  categories: selectCategories(),
  loading: selectShowsLoading(),
  error: selectShowsError(),
});

export default connect(mapStateToProps)(Shows);
