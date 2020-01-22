import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';

const Meta = props => {
  const { browserTitle, pageTitle, url, type, description, image } = props;
  return (
    <Head>
      {browserTitle ? <title key="title">{browserTitle}</title> : null}
      {description ? (
        <meta key="description" name="description" content={description} />
      ) : null}

      {/* Open Graph tags */}
      {url ? <meta key="og:url" property="og:url" content={url} /> : null}
      {type ? (
        <meta key="og:type" property="og:type" content="article" />
      ) : null}
      {pageTitle ? (
        <meta key="og:title" property="og:title" content={pageTitle} />
      ) : null}
      {description ? (
        <meta
          key="og:description"
          property="og:description"
          content={description}
        />
      ) : null}
      {image ? (
        <meta key="og:image" property="og:image" content={image} />
      ) : null}
    </Head>
  );
};

Meta.propTypes = {
  browserTitle: PropTypes.string,
  pageTitle: PropTypes.string,
  url: PropTypes.string,
  type: PropTypes.string,
  description: PropTypes.string,
  image: PropTypes.string,
};

export default Meta;
