import React from 'react';
import PropTypes from 'prop-types';

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
  show: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
};

export default ShowDetailHeader;
