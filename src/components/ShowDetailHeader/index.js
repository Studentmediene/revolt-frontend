import React from 'react';

import styles from './styles.css';

const ShowDetailHeader = props => (
  <div className={styles.container}>
    <div className={styles.showInfo}>
      <img
        className={styles.image}
        src={props.show.logoImageUrl}
        alt={props.show.title}
      />
      <div className={styles.showText}>
        <h2 className={styles.name}>{props.show.title}</h2>
        <p className={styles.lead}>{props.show.lead}</p>
      </div>
    </div>
  </div>
);

ShowDetailHeader.propTypes = {
  show: React.PropTypes.oneOfType([
    React.PropTypes.bool,
    React.PropTypes.object,
  ]),
};

export default ShowDetailHeader;
