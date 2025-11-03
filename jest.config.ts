const nextJest = require('next/jest');

const createJestConfig = nextJest({ dir: './' });

const customJestConfig = {
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '^uuid$': '<rootDir>/__mocks__/uuid.js',
    '^@/(.*)$': '<rootDir>/src/$1',
    '^@mui/x-charts(.*)$': '<rootDir>/__mocks__/@mui/x-charts.js',
    '^@mui/x-charts/PieChart$': '<rootDir>/__mocks__/@mui/x-charts/PieChart.js',
  },
  transformIgnorePatterns: [
    'node_modules/(?!(uuid|flatqueue|@mui/x-charts|msw|until-async|@mswjs)/)',
  ],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  extensionsToTreatAsEsm: ['.ts', '.tsx', '.jsx'],
};

module.exports = async () => {
  const config = await createJestConfig(customJestConfig)();
  // Patch in our transform override
  config.transformIgnorePatterns = customJestConfig.transformIgnorePatterns;
  return config;
};
