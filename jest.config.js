module.exports = {
  testEnvironment: 'node',
  testPathIgnorePatterns: ['/node_modules', './__tests__/__utils.js', './client/'],
  collectCoverageFrom: [
    '**/*.js',
    '!**/*.config.js',
    '!**/config/**/*',
    '!**/routes/**/*',
    '!**/__tests__/**/*',
    '!**/coverage/**/*',
    '!**/client/**/*'
  ]
};
