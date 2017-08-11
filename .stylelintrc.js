module.exports = {
  "extends": "stylelint-config-standard",
  "rules": {
    "color-hex-case": "upper",
    "string-quotes": "single",
    "font-family-name-quotes": "always-where-recommended",
    "selector-pseudo-class-no-unknown": [
      true,
      {
        "ignorePseudoClasses": [
          "global"
        ]
      }
    ],
    "indentation": 2
  }
}
