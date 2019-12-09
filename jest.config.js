module.exports = {
  verbose: true,
  cacheDirectory: '.jest-cache',
  coverageDirectory: '.jest-coverage',
  coverageReporters: ['json-summary', 'text', 'lcov'],
  testPathIgnorePatterns: [
    '<rootDir>/node_modules/',
  ],
  transform: {
    '^.+\\.jsx?$': 'babel-jest',
  },
};
