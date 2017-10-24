/*
 *
 * PostAdmin
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import {
  selectShows,
  selectShowsLoading,
  selectShowsError,
} from 'components/Shows/selectors';
import {
  selectCategories,
  selectCategoriesLoading,
  selectCategoriesError,
} from 'components/Categories/selectors';
import { loadShows } from 'components/Shows/actions';
import { loadCategories } from 'components/Categories/actions';
import { addPostPending } from './actions';
import styles from './styles.css';

import TextInput from 'components/common/input/TextInput';
import TextAreaInput from 'components/common/input/TextAreaInput';
import CheckboxInput from 'components/common/input/CheckboxInput';
import SubmitButton from 'components/common/button/SubmitButton';
import UploadFileInput from 'components/common/input/UploadFileInput';
import SelectInput from 'components/common/input/SelectInput';

export class PostAdmin extends React.Component {
  // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      lead: '',
      content: '',
      coverPhoto: '',
      authorId: null,
      pinned: false,
      categoryId: null,
      showId: null,
      // Fields below should be refactored at a later stage
      file: '',
      imagePreviewUrl: '',
    };
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleLeadChange = this.handleLeadChange.bind(this);
    this.handleContentChange = this.handleContentChange.bind(this);
    this.handlePinnedChange = this.handlePinnedChange.bind(this);
    this.handleCategoryChange = this.handleCategoryChange.bind(this);
    this.handleShowChange = this.handleShowChange.bind(this);
    this.handleCoverPhotoChange = this.handleCoverPhotoChange.bind(this);
  }
  componentWillMount() {
    this.props.loadShows();
    this.props.loadCategories();
  }

  handleTitleChange(event) {
    event.preventDefault();
    this.setState({ title: event.target.value });
  }

  handleLeadChange(event) {
    event.preventDefault();
    this.setState({ lead: event.target.value });
  }
  handleContentChange(event) {
    event.preventDefault();
    this.setState({ content: event.target.value });
  }
  handleShowChange(event) {
    this.setState({ showId: event.target.value || null });
  }
  handleCategoryChange(event) {
    this.setState({ categoryId: event.target.value || null });
  }
  handlePinnedChange() {
    this.setState({ pinned: !this.state.pinned });
  }

  handleCoverPhotoChange(e) {
    e.preventDefault();

    const reader = new FileReader();
    const file = e.target.files[0];
    // console.log(file);

    reader.onloadend = () => {
      this.setState({
        file,
        imagePreviewUrl: reader.result,
      });
    };

    reader.readAsDataURL(file);
  }

  render() {
    let shows;
    if (this.props.shows !== false && this.props.shows.length > 0) {
      shows = this.props.shows.map(show => (
        <option value={show.id} key={show.id}>
          {show.title}
        </option>
      ));
      shows.unshift(
        <option value={''} key={'show-placeholder'}>
          Velg show
        </option>,
      );
    }

    let categories;
    if (this.props.categories !== false && this.props.categories.length > 0) {
      categories = this.props.categories.map(category => (
        <option value={category.id} key={category.id}>
          {category.title}
        </option>
      ));
      categories.unshift(
        <option value={''} key={'category-placeholder'}>
          Velg kategori
        </option>,
      );
    }
    return (
      <div className={styles.postAdmin}>
        <h1>Opprett ny bloggpost</h1>
        <div>
          <TextInput
            label={'Tittel'}
            onChange={this.handleTitleChange}
            value={this.state.title}
          />
          <UploadFileInput
            label={'Forsidebilde'}
            onChange={this.handleCoverPhotoChange}
          />
          <TextAreaInput
            label={'Ingress'}
            onChange={this.handleLeadChange}
            value={this.state.lead}
          />
          <TextAreaInput
            label={'Brødtekst'}
            onChange={this.handleContentChange}
            value={this.state.content}
          />
          <SelectInput
            label={'Tilhørende show'}
            onChange={this.handleShowChange}
            options={shows}
          />
          <SelectInput
            label={'Kategori'}
            onChange={this.handleCategoryChange}
            options={categories}
          />
          <CheckboxInput
            label={'Fest til toppen av forsiden?'}
            onChange={this.handlePinnedChange}
            value={this.state.pinned}
          />
          <SubmitButton onClick={() => this.props.onAddPost(this.state)}>
            Opprett ny bloggpost
          </SubmitButton>
        </div>
      </div>
    );
  }
}

PostAdmin.propTypes = {
  shows: React.PropTypes.oneOfType([
    React.PropTypes.bool,
    React.PropTypes.array,
  ]),
  categories: React.PropTypes.oneOfType([
    React.PropTypes.bool,
    React.PropTypes.array,
  ]),
  onAddPost: React.PropTypes.func,
  loadShows: React.PropTypes.func,
  loadCategories: React.PropTypes.func,
};

PostAdmin.defaultProps = {
  showsLoading: false,
  showsError: false,
  categoriesLoading: false,
  categoriesError: false,
  shows: [],
  categories: [],
};

const mapStateToProps = createStructuredSelector({
  shows: selectShows(),
  categories: selectCategories(),
  showsLoading: selectShowsLoading(),
  showsError: selectShowsError(),
  categoriesLoading: selectCategoriesLoading(),
  categoriesError: selectCategoriesError(),
});

function mapDispatchToProps(dispatch) {
  return {
    onAddPost: post => dispatch(addPostPending(post)),
    loadShows: () => dispatch(loadShows()),
    loadCategories: () => dispatch(loadCategories()),
  };
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(PostAdmin),
);
