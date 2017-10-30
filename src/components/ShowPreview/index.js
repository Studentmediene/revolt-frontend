import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import styles from './styles.css';

const ShowPreview = props => (
  <div className={styles.container}>
    <Link className={styles.imageLink} to={`/programmer/${props.slug}`}>
      <img
        className={styles.image}
        src={props.logoImageUrl}
        alt={props.title}
      />
    </Link>
    <Link className={styles.nameLink} to={`/programmer/${props.slug}`}>
      <h2 className={styles.name}>{props.title}</h2>
    </Link>
    <div className={styles.lead}>{props.lead}</div>
  </div>
);

ShowPreview.propTypes = {
  title: PropTypes.string.isRequired,
  logoImageUrl: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired,
  lead: PropTypes.string.isRequired,
};

export default ShowPreview;
