module.exports = {
  extends: 'stylelint-config-standard',
  rules: {
    'color-hex-case': 'upper',
    'string-quotes': 'single',
    'declaration-empty-line-before': [
      'never',
      {
        ignore: ['after-declaration'],
      },
    ],
    'font-family-name-quotes': 'always-where-recommended',
    'selector-pseudo-class-no-unknown': [
      true,
      {
        ignorePseudoClasses: ['global'],
      },
    ],
    indentation: 2,
  },
};
