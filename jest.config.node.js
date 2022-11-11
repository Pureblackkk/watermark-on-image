/** @type {import('ts-jest').JestConfigWithTsJest} */
export default {
  preset: 'ts-jest',
  testEnvironment: 'node',
  modulePaths: ["<rootDir>/src"],
  moduleNameMapper: {
    'src/(.*)': '<rootDir>/src/$1',
  },
  testRegex: '(/test/node/.*|(\\.|/)(test|spec))\\.(tsx|ts)?$',
};