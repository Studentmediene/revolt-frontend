import React from 'react';
import PropTypes from 'prop-types';

import styles from './styles.css';

const ShowHeader = ({ show: { title, content, logoImageUrl } }) => (
  <div className={styles.container}>
    <div className={styles.showInfo}>
      <img className={styles.image} src={logoImageUrl} alt={title} />
      <div className={styles.showText}>
        <h2 className={styles.title}>{title}</h2>
        <div dangerouslySetInnerHTML={{ __html: content }} />
      </div>
    </div>
  </div>
);

ShowHeader.propTypes = {
  show: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
};

export default ShowHeader;
