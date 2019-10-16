import React from 'react';
import Link from 'next/link';

import styles from './styles.scss';
import pngLogo from './RR_logo.png';

const Logo = () => (
  <Link href="/">
    <img src={pngLogo} alt="Logo" className={styles.logo} />
  </Link>
);

export default Logo;
