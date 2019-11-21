import React from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import LazyLoad from 'react-lazyload';
import CategoryTag from 'components/common/tag/CategoryTag';

import styles from './styles.scss';

const ShowPreview = props => {
  let categories;
  if (props.categories && props.categories.length > 0) {
    categories = props.categories.map((category, index) => (
      <CategoryTag {...category} index={index} position={'top'} key={index} />
    ));
  }

  return (
    <div className={styles.container}>
      {categories}
      <Link href={`/programmer/[slug]`} as={`/programmer/${props.slug}`}>
        <a className={styles.link} href={`/programmer/${props.slug}`}>
          <div className={styles.padding}>
            <div className={styles.imageWrapper}>
              <LazyLoad height={'100%'} offset={50} once>
                <img className={styles.image} src={props.logoImageUrl} alt="" />
              </LazyLoad>
            </div>
            <div className={styles.textContainer}>
              <h2>{props.title}</h2>
              <div className={styles.lead}>{props.lead}</div>
            </div>
          </div>
        </a>
      </Link> 
    </div>
  );
};

ShowPreview.propTypes = {
  title: PropTypes.string.isRequired,
  logoImageUrl: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired,
  lead: PropTypes.string.isRequired,
  categories: PropTypes.array,
};

export default ShowPreview;
