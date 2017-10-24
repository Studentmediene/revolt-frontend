import React from 'react';
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
  title: React.PropTypes.string.isRequired,
  logoImageUrl: React.PropTypes.string.isRequired,
  slug: React.PropTypes.string.isRequired,
  lead: React.PropTypes.string.isRequired,
};

export default ShowPreview;
