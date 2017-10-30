import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { withRouter } from 'react-router-dom';
import moment from 'moment';
import { selectPost, selectPostLoading, selectPostError } from './selectors';
import { loadPost } from './actions';
import styles from './styles.css';

export class Post extends React.Component {
  componentWillMount() {
    this.props.loadPost(this.props.match.params.slug);
    moment.locale('NB_no', {
      calendar: {
        lastDay: '[I går] HH:mm',
        sameDay: '[I dag] HH:mm',
        nextDay: '[I morgen] HH:mm',
        sameElse: 'DD.MM.YY HH:mm',
      },
    });
  }

  getNormalizedDateString(dateString) {
    const paddedString = i => (i < 10 ? `0${i}` : `${i}`);

    const date = moment(dateString);
    const year = date.year();
    const month = date.month() + 1;
    const day = date.date();

    return `${paddedString(day)}.${paddedString(month)}.${year}`;
  }

  render() {
    if (this.props.loading || this.props.post === false) {
      return <div />;
    }
    const time = this.getNormalizedDateString(this.props.post.createdAt);

    return (
      <div className={styles.post}>
        <h1 className={styles.title}>{this.props.post.title}</h1>
        <div className={styles.meta}>
          <span className={styles.createdAt}>{time}</span>
        </div>
        <p
          className={styles.body}
          dangerouslySetInnerHTML={{ __html: this.props.post.content }}
        />
      </div>
    );
  }
}

Post.propTypes = {
  post: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  match: PropTypes.object,
  loadPost: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  error: PropTypes.bool,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  post: selectPost(),
  loading: selectPostLoading(),
  error: selectPostError(),
});

function mapDispatchToProps(dispatch) {
  return {
    loadPost: slug => dispatch(loadPost(slug)),
    dispatch,
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Post));
