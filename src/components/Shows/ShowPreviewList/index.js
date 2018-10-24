import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import ShowPreview from 'components/Shows/ShowPreview';
import ShowMoreButton from 'components/common/button/ShowMoreButton';

import styles from './styles.scss';

const ShowPreviewList = props => {
  const compareShows = (showA, showB) => showA.title.localeCompare(showB.title);

  const activeShows = props.shows
    .filter(show => !show.archived)
    .sort(compareShows)
    .map((show, index) => <ShowPreview {...show} key={`active-${index}`} />);

  const archivedShows = props.shows
    .filter(show => show.archived)
    .sort(compareShows)
    .map((show, index) => <ShowPreview {...show} key={`archived-${index}`} />);

  return (
    <React.Fragment>
      <div className={styles.shows}>{activeShows}</div>
      <ShowMoreButton
        text={'Arkiverte programmer'}
        onClick={props.toggleArchivedShows}
        active={props.showArchivedShows}
      />
      <div
        className={classNames(styles.shows, {
          [styles.hidden]: !props.showArchivedShows,
        })}
      >
        {archivedShows}
      </div>
    </React.Fragment>
  );
};

ShowPreviewList.propTypes = {
  shows: PropTypes.array.isRequired,
  showArchivedShows: PropTypes.bool.isRequired,
  toggleArchivedShows: PropTypes.func.isRequired,
};

export default ShowPreviewList;
