import faker from 'faker'
import * as FormHelper from '../support/form-helper'
import * as Http from '../support/login-mocks'

const smulateValidSubmit = (): void => {
  cy.getByTestId('email').type(faker.internet.email())
  cy.getByTestId('password').type(faker.random.alphaNumeric(6))
  cy.getByTestId('submit').click()
}

describe('Login', () => {
  beforeEach(() => {
    cy.visit('/login')
  })

  it('Should load with correct initial state', () => {
    FormHelper.testInputStatus('email', 'Campo obrigatório!')
    FormHelper.testInputStatus('password', 'Campo obrigatório!')

    cy.getByTestId('submit').should('have.attr', 'disabled')
    cy.getByTestId('error-wrap').should('not.have.descendants')
    cy.getByTestId('email').should('not.have.length')
    cy.getByTestId('password').should('not.have.length')
  })

  it('Should present error state if form is invalid', () => {
    cy.getByTestId('email').type(faker.random.word())
    FormHelper.testInputStatus('email', 'Valor inválido')
    cy.getByTestId('password').type(faker.random.alphaNumeric(3))
    FormHelper.testInputStatus('password', 'Valor inválido')

    cy.getByTestId('submit').should('have.attr', 'disabled')
    cy.getByTestId('error-wrap').should('not.have.descendants')
  })

  it('Should present valid state if form is valid', () => {
    cy.getByTestId('email').type(faker.internet.email())
    FormHelper.testInputStatus('email')
    cy.getByTestId('password').type(faker.random.alphaNumeric(6))
    FormHelper.testInputStatus('password')
    cy.getByTestId('submit').should('not.have.attr', 'disabled')
    cy.getByTestId('error-wrap').should('not.have.descendants')
  })

  it('Should present InvalidCredentialsError on 401', () => {
    Http.mockInvalidCredentials()
    cy.getByTestId('form').within(($) => {
      smulateValidSubmit()
      FormHelper.testErrorStatus('Credenciais inválidas')
    })
    FormHelper.testUrl('/login')
  })

  it('Should present UnexpectedError on 400', () => {
    Http.mockUnexpectedError()
    cy.getByTestId('form').within(($) => {
      smulateValidSubmit()
      FormHelper.testErrorStatus('Algo de errado aconteceu. Tente novamente em breve.')
    })
    FormHelper.testUrl('/login')
  })

  it('Should present UnexpectedError if invalid data is returned', () => {
    Http.mockDataInvalid()
    cy.getByTestId('form').within(($) => {
      smulateValidSubmit()
      FormHelper.testErrorStatus('Algo de errado aconteceu. Tente novamente em breve.')
    })
    FormHelper.testUrl('/login')
  })

  it('Should present save accessToken if valid credentials are provided', () => {
    Http.mockOk()
    cy.getByTestId('form').within(() => {
      smulateValidSubmit()
      cy.getByTestId('main-error').should('not.exist')
        .getByTestId('spinner').should('not.exist')
    })
    FormHelper.testUrl('/')
    FormHelper.testLocalStorageItem('accessToken')
  })

  it('Should prevent multiple submits', () => {
    Http.mockOk()
    cy.getByTestId('email').type(faker.internet.email())
    cy.getByTestId('password').type(faker.random.alphaNumeric(6))
    cy.getByTestId('submit').dblclick()
    cy.get('@request.all').should('have.length', 1)
  })

  it('Should not call submit if form is invalid', () => {
    Http.mockOk()
    cy.getByTestId('email').type(faker.internet.email()).type('{enter}')
    cy.get('@request.all').should('have.length', 0)
  })
})
