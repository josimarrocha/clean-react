module.exports = {
  roots: ['<rootDir>/src'],
  collectCoverageFrom: [
    '<rootDir>/src/**/*.{ts,tsx}',
    '!<rootDir>/src/main/**/*',
    '!<rootDir>/src/presentation/components/router/*',
    '!<rootDir>/src/**/index.ts',
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
    '.+\\.(ts|tsx)$': 'ts-jest',
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/src/main/config/transformer.js'
  }
}
