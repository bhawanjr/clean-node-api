module.exports = {
  roots: ['<rootDir>/src'],
  collectCoverateFrom: ['<rootDir>/src/**/*.ts'],
  coverageDirectory: 'coverage',
  testEnviroment: 'node',
  transform: {
    '.+\\.ts$': 'ts-jest'
  }
}
