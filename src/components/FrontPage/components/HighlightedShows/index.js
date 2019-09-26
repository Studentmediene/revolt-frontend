import React from 'react';
import styles from './styles.scss';
import classNames from 'classnames';
import Episode from 'components/Episode';

class HighlightedShows extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className={styles.container}>
      <div className={styles.showsContainer}>
        <div className={styles.showImage}>show1</div>
          <div className={classNames(styles.showImage, styles.selected)}>show2</div>
        <div className={styles.showImage}>show3</div>
      </div>
      <div className={styles.date}>31.09.2019</div>
      <div className={styles.playerContainer}>
        <div className={styles.player}>
          <Episode showName={'test'} key={'heisan'} />
          </div>
        </div>
      </div>
    );
  }
}

export default HighlightedShows;
