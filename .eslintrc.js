module.exports = {
  extends: [require.resolve('@consta/widgets-configs/eslintrc')],
  overrides: [
    {
      files: ['./src/**/*.stories.tsx'],
      rules: {
        'import/no-default-export': ['off'],
        '@typescript-eslint/no-shadow': ['off'],
      },
    },
  ],
  plugins: ['todo-plz'],
  rules: {
    'todo-plz/ticket-ref': [
      'error',
      {
        pattern: '(GDC-|UI-Kit#)[0-9]+',
        terms: ['TODO', 'todo'],
      },
    ],
    'react/jsx-filename-extension': ['error', { extensions: ['.jsx', '.tsx'] }],
    '@typescript-eslint/ban-types': ['off'],
    '@typescript-eslint/tslint/config': [
      'error',
      {
        rules: {
          'no-array-mutation': false,
        },
      },
    ],
    'react-hooks/exhaustive-deps': 'off',
    'default-case': 'off',
  },
}
