import React from 'react';
import styles from './styles.scss';
import classNames from 'classnames';
import Episode from 'components/Episode';
import PropTypes from 'prop-types';

//import Feber_logo_profil from './TestImages/Feber_logo_profil.png';

class HighlightedShows extends React.Component {
  constructor(props) {
    super(props);
    // test state
    this.state = {
      selectedShowIndex: 1,
    };
  }

  startInterval() {
    this.interval = setInterval(
      () =>
        this.setState({
          selectedShowIndex:
            this.state.selectedShowIndex === this.props.shows.length-1
              ? 0
              : this.state.selectedShowIndex + 1,
        }),
      6000,
    );
  }

  componentDidMount() {
    this.startInterval();
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  mapShows() {
    return this.props.shows.map((show, index) => (
      <div
        className={classNames(styles.showImage, {
          [styles.selected]: index === this.state.selectedShowIndex,
          [styles.unselected]: index != this.state.selectedShowIndex,
        })}
        key={index}
        onMouseEnter={() => {
          clearInterval(this.interval);
          this.setState({ selectedShowIndex: index });
        }}
        onMouseLeave={() => {
          this.startInterval();
        }}
      >
        <img
          className={styles.img}
          src={show.imgUrl}
          alt={show.key}
          width="100%"
        />
      </div>
    ));
  }

  render() {
    const show = this.props.shows[this.state.selectedShowIndex];
    return (
      <div className={styles.container}>
        <div className={styles.title}>De nyeste programmene</div>
        <div className={styles.showsContainer}>{this.mapShows()}</div>
        <div className={styles.playerContainer}>
          <div className={styles.player}>
            <Episode
              title={show.title}
              publishAt={show.published}
              id={show.id}
              key={'episode'}
            />
          </div>
        </div>
      </div>
    );
  }
}

HighlightedShows.propTypes = {
  shows: PropTypes.array,
};

export default HighlightedShows;
