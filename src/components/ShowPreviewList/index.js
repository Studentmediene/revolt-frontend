import React from 'react';
import PropTypes from 'prop-types';
import Show from 'components/ShowPreview';

import styles from './styles.css';
import arrowImage from './arrow_down.svg';

const ShowPreviewList = props => {
  const compareShows = (showA, showB) => showA.title.localeCompare(showB.name);

  const activeShows = props.shows
    .filter(show => !show.archived)
    .sort(compareShows)
    .map((show, index) => <Show {...show} key={`show-${index}`} />);

  const archivedShows = props.shows
    .filter(show => show.archived)
    .sort(compareShows)
    .map((show, index) => <Show {...show} key={`show-${index}`} />);

  return (
    <div className={styles.container}>
      <div className={styles.activeShows}>{activeShows}</div>
      <button
        className={styles.archivedShowsButton}
        onClick={props.toggleArchivedShows}
      >
        Arkiverte programmer{' '}
        <img
          src={arrowImage}
          alt="Arrow"
          className={
            props.hideArchivedShows ? styles.arrowDown : styles.arrowLeft
          }
        />
      </button>
      <div
        className={
          props.hideArchivedShows
            ? styles.archivedShowsHidden
            : styles.archivedShowsVisible
        }
      >
        {archivedShows}
      </div>
    </div>
  );
};

ShowPreviewList.propTypes = {
  shows: PropTypes.array.isRequired,
  hideArchivedShows: PropTypes.bool.isRequired,
  toggleArchivedShows: PropTypes.func.isRequired,
};

export default ShowPreviewList;
