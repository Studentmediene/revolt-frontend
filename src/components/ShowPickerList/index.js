import React from 'react';

import styles from './styles.css';

const ShowPickerList = props => {
  const compareShows = (showA, showB) => showA.name.localeCompare(showB.name);

  const activeShows = props.shows
    .filter(show => !show.archived)
    .sort(compareShows)
    .map((show, index) => <div key={`show-${index}`}>{show.name}</div>);

  const archivedShows = props.shows
    .filter(show => show.archived)
    .sort(compareShows)
    .map((show, index) => <div key={`show-${index}`}>{show.name}</div>);

  return (
    <div className={styles.showPickerList}>
      <h2>Aktive programmer</h2>
      <div className={styles.activeShows}>{activeShows}</div>
      <h1>Arkiverte programmer</h1>
      <div className={styles.archivedShows}>{archivedShows}</div>
    </div>
  );
};

ShowPickerList.propTypes = {
  shows: React.PropTypes.oneOfType([
    React.PropTypes.bool,
    React.PropTypes.array,
  ]),
};

export default ShowPickerList;
