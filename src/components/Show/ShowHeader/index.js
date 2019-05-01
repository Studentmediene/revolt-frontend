import React from 'react';
import PropTypes from 'prop-types';

import styles from './styles.scss';

const ShowHeader = ({
  show: { title, content, logoImageUrl, categories, podcastUrl },
}) => {
  let podcastLink;

  if (podcastUrl) {
    podcastLink = (
      <div className={styles.podcastLink}>
        Vi har også en podkast! Søk opp «{title}» i din podkastapp eller{' '}
        <a href={podcastUrl}>legg inn RSS-feeden</a>.
      </div>
    );
  }

  let categoryTags;
  if (categories && categories.length > 0) {
    categoryTags = (
      <div className={styles.categories}>
        <span>Kategorier: </span>
        {categories.map((category, index) => (
          <span key={index}>{category.name}</span>
        ))}
      </div>
    );
  }
  return (
    <div className={styles.container}>
      <div className={styles.imageWrapper}>
        <img className={styles.image} src={logoImageUrl} alt={title} />
      </div>
      <div className={styles.showText}>
        <h2 className={styles.title}>{title}</h2>
        <div dangerouslySetInnerHTML={{ __html: content }} />
      </div>
      {podcastLink}
      {categoryTags}
    </div>
  );
};

ShowHeader.propTypes = {
  show: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
};

export default ShowHeader;
