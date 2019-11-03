import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';

const Meta = props => {
  const { host, url, title, description, image: imageUrl } = props;
  const image = host + imageUrl;
  return (
    <Head>
      <title key="title">{title}</title>
      <meta key="og:type" property="og:type" content="article" />
      <meta key="og:url" property="og:url" content={url} />
      <meta key="og:title" property="og:title" content={title} />
      <meta
        key="og:description"
        property="og:description"
        content={description}
      />
      <meta key="og:image" property="og:image" content={image} />
    </Head>
  );
};

Meta.propTypes = {
  host: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
};

export default Meta;
