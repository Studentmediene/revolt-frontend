import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import LazyLoad from 'react-lazyload';

import styles from './styles.css';

const ShowPreview = props => (
  <div className={styles.container}>
    <div className={styles.logoImage}>
      <Link className={styles.imageLink} to={`/programmer/${props.slug}`}>
        <LazyLoad height={300} offset={100} once>
          <img
            className={styles.image}
            src={props.logoImageUrl}
            alt={props.title}
          />
        </LazyLoad>
      </Link>
    </div>
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
