module.exports = {
  roots: ['<rootDir>/src'],
  collectCoverageFrom: [
    '<rootDir>/src/**/*.{ts,tsx}',
    '!**/*.d.ts'
  ],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',

    // para o jest não testar .scss, temos que usar
    // essa lib (↓) p/ criar um obj vazio (dummy) para ser ignorado pelo jest
    '\\.scss$': 'identity-obj-proxy'
  },
  coverageDirectory: 'coverage',
  testEnvironment: 'jsdom',
  transform: {
    '.+\\.(ts|tsx)$': 'ts-jest'
  }
}
