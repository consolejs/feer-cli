/* eslint-disable */
module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        loose: true,
        modules: false,
        exclude: ['transform-function-name']
      }
    ]
  ],
  plugins: [
    '@babel/plugin-transform-object-assign',
    '@babel/plugin-proposal-optional-chaining',
    '@babel/plugin-proposal-logical-assignment-operators',
    [
      '@babel/plugin-proposal-class-properties',
      {
        loose: true
      }
    ]
  ]
};
