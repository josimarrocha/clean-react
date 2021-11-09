import faker from 'faker'

const baseUrl = Cypress.config().baseUrl

describe('Login', () => {
  beforeEach(() => {
    cy.visit('/login')
  })

  it('Should load with correct initial state', () => {
    cy.getByTestId('email-status').should('have.attr', 'title', 'Campo obrigatório!')
    cy.getByTestId('password-status').should('have.attr', 'title', 'Campo obrigatório!')
    cy.getByTestId('submit').should('have.attr', 'disabled')
    cy.getByTestId('error-wrap').should('not.have.descendants')
    cy.getByTestId('email').should('not.have.length')
    cy.getByTestId('password').should('not.have.length')
  })

  it('Should present error state if form is invalid', () => {
    cy.getByTestId('email').type(faker.random.word())
    cy.getByTestId('email-status').should('have.attr', 'title', 'Valor inválido')
    cy.getByTestId('password').type(faker.random.alphaNumeric(3))
    cy.getByTestId('password-status').should('have.attr', 'title', 'Valor inválido')
    cy.getByTestId('submit').should('have.attr', 'disabled')
    cy.getByTestId('error-wrap').should('not.have.descendants')
  })

  it('Should present valid state if form is valid', () => {
    cy.getByTestId('email').type(faker.internet.email())
    cy.getByTestId('email-status').should('have.attr', 'title', 'Tudo certo')
    cy.getByTestId('password').type(faker.random.alphaNumeric(6))
    cy.getByTestId('password-status').should('have.attr', 'title', 'Tudo certo')
    cy.getByTestId('submit').should('not.have.attr', 'disabled')
    cy.getByTestId('error-wrap').should('not.have.descendants')
  })

  it('Should present error if invalid credentials are provided', () => {
    cy.getByTestId('form').within(($) => {
      cy.getByTestId('email').type(faker.internet.email())
      cy.getByTestId('password').type(faker.random.alphaNumeric(6))
      cy.root().submit().then(() => {
        cy.getByTestId('error-wrap')
          .getByTestId('spinner').should('not.exist')
          .getByTestId('main-error').should('exist')
          .getByTestId('main-error').should('contain.text', 'Algo de errado aconteceu. Tente novamente em breve.')
      })
    })
    cy.url().should('eq', `${baseUrl}/login`)
  })
})
