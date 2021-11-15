const baseUrl = Cypress.config().baseUrl

export const testInputStatus = (field: string, error: string = ''): void => {
  cy.getByTestId(`${field}-wrap`).should('have.attr', 'data-status', error ? 'invalid' : 'valid')
  cy.getByTestId(field).should('have.attr', 'title', error)
  cy.getByTestId(`${field}-label`).should('have.attr', 'title', error)
}

export const testErrorStatus = (error: string): void => {
  cy.getByTestId('spinner').should('not.exist')
  cy.getByTestId('main-error').should('contain.text', error)
}

export const testLocalStorageItem = (key: string): void => {
  cy.window().then(window => assert.isOk(window.localStorage.getItem(key)))
}

export const testUrl = (path: string): void => {
  cy.url().should('eq', `${baseUrl}${path}`)
}
