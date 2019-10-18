const withSass = require('@zeit/next-sass');
const withCss = require('@zeit/next-css');
const config = {
  cssModules: true,
  sassLoaderOptions: {
    includePaths: ['src'],
  },
  webpack: config => {
    // access to webpack config here
    config.module.rules.push({
      test: [/\.mp3$/, /\.png$/, /\.svg$/],
      use: [
        {
          loader: require.resolve('file-loader'),
          options: {
            name: 'public/media/[name].[hash:8].[ext]',
          },
        },
      ],
    });
    return config;
  },
};

module.exports = withCss(withSass(config));
