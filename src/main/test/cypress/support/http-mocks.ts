import faker from 'faker'

export const mockInvalidCredentials = (url: RegExp): void => {
  cy.intercept({
    method: 'POST',
    url
  }, {
    statusCode: 401,
    body: {
      error: faker.random.words()
    }
  })
}

export const mockUnexpectedError = (url: RegExp, method: string): void => {
  cy.intercept({
    method,
    url
  }, {
    statusCode: 400,
    body: {
      error: faker.random.words()
    }
  })
}

export const mockOk = (url: RegExp, method: string, body: object): void => {
  cy.intercept({
    method,
    url
  }, {
    statusCode: 200,
    body
  }).as('request')
}
