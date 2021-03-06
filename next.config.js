const withSass = require('@zeit/next-sass');
const config = {
  cssModules: true,
  sassLoaderOptions: {
    includePaths: ['src'],
  },
  env: {
    BETA: process.env.BETA,
    G_ANALYTICS: process.env.G_ANALYTICS,
    SENTRY_URL: process.env.SENTRY_URL,
  },
  webpack(config) {
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

module.exports = withSass(config);
