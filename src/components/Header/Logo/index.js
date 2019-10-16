import React from 'react';
import Link from 'next/link';

import styles from './styles.scss';

const Logo = () => (
  <Link href="/">
    <img src="/assets/RR_logo.png" alt="Logo" className={styles.logo} />
  </Link>
);

export default Logo;
