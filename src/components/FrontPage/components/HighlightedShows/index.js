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

  mapShows() {
    return this.props.shows.map((show, index) => (
      <div
        className={classNames(styles.showImage, {
          [styles.selected]: index === this.state.selectedShowIndex,
        })}
        key={index}
        onMouseEnter={() => {
          this.setState({ selectedShowIndex: index });
        }}
      >
        <img src={show.imgUrl} alt={show.key} width="100%" />
      </div>
    ));
  }

  render() {
    return (
      <div className={styles.container}>
      <div className={styles.title}>De nyeste programmene</div>
        <div className={styles.showsContainer}> {this.mapShows()} </div>
      <div className={styles.playerContainer}>
        <div className={styles.player}>
            <Episode
              title={this.props.shows[this.state.selectedShowIndex].title}
              publishAt={
                this.props.shows[this.state.selectedShowIndex].published
              }
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
