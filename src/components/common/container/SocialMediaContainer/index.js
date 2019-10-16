import React from 'react';

import styles from './styles.scss';
import SocialMediaButton from 'components/common/button/SocialMediaButton';

const SocialMediaContainer = () => (
  <div className={styles.socialMediaContainer}>
    <SocialMediaButton
      link="https://www.facebook.com/radiorevolt.no/"
      image="/assets/facebook_logo.svg"
      text="Facebook"
    />
    <SocialMediaButton
      link="https://www.instagram.com/radiorevolt/"
      image="/assets/instagram_logo.svg"
      text="Instagram"
    />
  </div>
);

export default SocialMediaContainer;
