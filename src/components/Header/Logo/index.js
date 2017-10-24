import React from 'react';
import { Link } from 'react-router-dom';

import styles from './styles.css';
import pngLogo from './RR_logo.png';

const Logo = () => (
  <Link to="/">
    <img src={pngLogo} alt="Logo" className={styles.logo} />
  </Link>
);

export default Logo;
