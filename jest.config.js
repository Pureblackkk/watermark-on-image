/** @type {import('ts-jest').JestConfigWithTsJest} */
export default {
  preset: 'ts-jest',
  setupFiles: ["jest-canvas-mock"],
  testEnvironment: 'jsdom',
  modulePaths: ["<rootDir>/src"],
  moduleNameMapper: {
    'src/(.*)': '<rootDir>/src/$1',
  },
  testRegex: '(/test/.*|(\\.|/)(test|spec))\\.(tsx|ts)?$',
};