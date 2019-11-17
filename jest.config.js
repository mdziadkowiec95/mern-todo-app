module.exports = {
  testEnvironment: 'node',
  testPathIgnorePatterns: ['/node_modules', './__tests__/__utils.js'],
  collectCoverageFrom: [
    '**/*.js',
    '!**/*.config.js',
    '!**/config/**/*',
    '!**/routes/**/*',
    '!**/__tests__/**/*',
    '!**/coverage/**/*'
  ]
};
