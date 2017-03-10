/**
*
* ShowPreviewList
*
*/

import React from 'react';
import Show from 'components/ShowPreview';

import styles from './styles.css';
import arrowImage from './arrow_down.svg';

function ShowPreviewList(props) {
  const compareShows = (showA, showB) => showA.name.localeCompare(showB.name);

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
      <div className={styles.activeShows}>
        {activeShows}
      </div>
      <button className={styles.archivedShowsButton} onClick={props.toggleArchivedShows}>
        Arkiverte programmer <img src={arrowImage} alt="Arrow" className={props.hideArchivedShows ? styles.arrowDown : styles.arrowLeft} />
      </button>
      <div className={props.hideArchivedShows ? styles.archivedShowsHidden : styles.archivedShowsVisible}>
        {archivedShows}
      </div>
    </div>
  );
}

ShowPreviewList.propTypes = {
  shows: React.PropTypes.array.isRequired,
  hideArchivedShows: React.PropTypes.bool.isRequired,
  toggleArchivedShows: React.PropTypes.func.isRequired,
};

export default ShowPreviewList;
