module.exports = {
  extends: ['stylelint-config-standard', 'stylelint-prettier/recommended'],
  plugins: ['stylelint-order'],
  rules: {
    'color-named': 'never',
    'no-descending-specificity': null,
    'selector-pseudo-class-no-unknown': [
      true,
      { ignorePseudoClasses: ['focus-visible', 'global'] },
    ],
    'rule-empty-line-before': ['always', { except: ['after-single-line-comment', 'first-nested'] }],
    'declaration-empty-line-before': ['never', { ignore: ['after-declaration'] }],
    'string-quotes': 'single',
    'order/order': ['custom-properties', 'declarations', 'rules'],
    'at-rule-no-unknown': [
      true,
      {
        ignoreAtRules: ['define-mixin', 'mixin'],
      },
    ],
    'order/properties-order':  null,
  },
};
