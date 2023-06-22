module.exports = {
  // A list of paths to directories that Jest should use to search for files in
  roots: ['<rootDir>/src'],

  // The test environment that will be used for testing
  testEnvironment: 'jsdom',

  // The glob patterns Jest uses to detect test files
  testMatch: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[jt]s?(x)'],

  // An array of regexp pattern strings that are matched against all test paths, matched tests are skipped
  testPathIgnorePatterns: ['/node_modules/', '/public/'],

  // The regexp pattern or array of patterns that Jest uses to detect test files
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.jsx?$',

  // A map from regular expressions to paths to transformers
  transform: {
    '^.+\\.(js|jsx)?$': 'babel-jest',
  },

  transformIgnorePatterns: ['/node_modules/(?!axios).+\\.js$'],

  // Module file extensions for importing
  moduleFileExtensions: ['js', 'json', 'jsx', 'node'],
};
