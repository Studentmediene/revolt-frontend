import React from 'react';
import PropTypes from 'prop-types';
import LazyLoad from 'react-lazyload';
import Link from 'next/link';
import classNames from 'classnames';

import styles from './styles.scss';

const ImageLink = ({
  images,
  href,
  as,
  imageDescription,
  children,
  imageProps,
  ...restProps
}) => {
  const { small, medium, large } = images;
  const { className: customImageClassName, ...restImageProps } = imageProps;
  return (
    <Link href={href} as={as}>
      <a href={as} {...restProps}>
        <LazyLoad height={350} offset={100} once>
          <img
            className={classNames(styles.image, customImageClassName)}
            srcSet={`${large} 1024w, ${medium} 768w, ${small} 300w`}
            src={large}
            alt={imageDescription}
            {...restImageProps}
          />
        </LazyLoad>
        {children}
      </a>
    </Link>
  );
};

ImageLink.propTypes = {
  images: PropTypes.shape({
    small: PropTypes.string.isRequired,
    medium: PropTypes.string.isRequired,
    large: PropTypes.string.isRequired,
  }).isRequired,
  href: PropTypes.string.isRequired,
  as: PropTypes.string.isRequired,
  imageDescription: PropTypes.string.isRequired,
  children: PropTypes.node,
  className: PropTypes.string,
  imageProps: PropTypes.object,
};

ImageLink.defaultProps = {
  imageProps: {},
};

export default ImageLink;
