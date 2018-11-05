import React from 'react';

import styles from './styles.scss';
import facebookLogo from 'components/common/assets/facebook.svg';
import instagramLogo from 'components/common/assets/instagram.svg';
import SocialMediaButton from 'components/common/button/SocialMediaButton';

const Sidebar = () => (
  <div className={styles.sidebar}>
    <SocialMediaButton
      link="https://www.facebook.com/radiorevolt.no/"
      image={facebookLogo}
      text="Facebook"
    />
    <SocialMediaButton
      link="https://www.instagram.com/radiorevolt/"
      image={instagramLogo}
      text="Instagram"
    />
  </div>
);

export default Sidebar;
