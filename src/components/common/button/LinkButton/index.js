import React from 'react';
import { Link } from 'react-router-dom';

import styles from './styles.css';

const LinkButton = props => (
  <Link className={styles.wrapper} to={props.to}>
    <button className={styles.button}>{props.text}</button>
  </Link>
);

LinkButton.propTypes = {
  to: React.PropTypes.string.isRequired,
  text: React.PropTypes.string.isRequired,
};

export default LinkButton;
