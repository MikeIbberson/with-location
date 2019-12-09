module.exports = {
  verbose: true,
  testPathIgnorePatterns: ['<rootDir>/node_modules/'],
  transform: {
    '^.+\\.jsx?$': 'babel-jest',
  },
};
