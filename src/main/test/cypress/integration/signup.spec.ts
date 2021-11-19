import faker from 'faker'
import * as Http from '../support/signup-mocks'
import * as FormHelper from '../support/form-helper'

const smulateValidSubmit = (): void => {
  const password = faker.random.alphaNumeric(6)
  cy.getByTestId('name').type(faker.name.findName())
  cy.getByTestId('email').type(faker.internet.email())
  cy.getByTestId('password').type(password)
  cy.getByTestId('passwordConfirmation').type(password)
  cy.getByTestId('submit').click()
}

describe('Signup', () => {
  beforeEach(() => {
    cy.visit('/signup')
  })

  it('Should load with correct initial state', () => {
    FormHelper.testInputStatus('name', 'Campo obrigatório!')
    FormHelper.testInputStatus('email', 'Campo obrigatório!')
    FormHelper.testInputStatus('password', 'Campo obrigatório!')
    FormHelper.testInputStatus('passwordConfirmation', 'Campo obrigatório!')

    cy.getByTestId('submit').should('have.attr', 'disabled')
    cy.getByTestId('error-wrap').should('not.have.descendants')
    cy.getByTestId('email').should('not.have.length')
    cy.getByTestId('password').should('not.have.length')
  })

  it('Should present error state if form is invalid', () => {
    cy.getByTestId('name').type(faker.random.alphaNumeric(3))
    FormHelper.testInputStatus('name', 'Valor inválido')
    cy.getByTestId('email').type(faker.random.word())
    FormHelper.testInputStatus('email', 'Valor inválido')
    cy.getByTestId('password').type(faker.random.alphaNumeric(3))
    FormHelper.testInputStatus('password', 'Valor inválido')
    cy.getByTestId('passwordConfirmation').type(faker.random.alphaNumeric(4))
    FormHelper.testInputStatus('passwordConfirmation', 'Valor inválido')

    cy.getByTestId('submit').should('have.attr', 'disabled')
    cy.getByTestId('error-wrap').should('not.have.descendants')
  })

  it('Should present valid state if form is valid', () => {
    cy.getByTestId('name').type(faker.name.findName())
    FormHelper.testInputStatus('name')
    cy.getByTestId('email').type(faker.internet.email())
    FormHelper.testInputStatus('email')

    const password = faker.random.alphaNumeric(6)
    cy.getByTestId('password').type(password)
    FormHelper.testInputStatus('password')
    cy.getByTestId('passwordConfirmation').type(password)
    FormHelper.testInputStatus('passwordConfirmation')

    cy.getByTestId('submit').should('not.have.attr', 'disabled')
    cy.getByTestId('error-wrap').should('not.have.descendants')
  })

  it('Should present EmailInUserError on 403', () => {
    Http.mockEmailInUseError()
    cy.getByTestId('form').within(($) => {
      smulateValidSubmit()
      FormHelper.testErrorStatus('Esse e-mail já está em uso!')
    })
    FormHelper.testUrl('/signup')
  })

  it('Should present UnexpectedError on 400', () => {
    Http.mockUnexpectedError()
    cy.getByTestId('form').within(($) => {
      smulateValidSubmit()
      FormHelper.testErrorStatus('Algo de errado aconteceu. Tente novamente em breve.')
    })
    FormHelper.testUrl('/signup')
  })

  it('Should present UnexpectedError if invalid data is returned', () => {
    Http.mockDataInvalid()
    cy.getByTestId('form').within(($) => {
      smulateValidSubmit()
      FormHelper.testErrorStatus('Algo de errado aconteceu. Tente novamente em breve.')
    })
    FormHelper.testUrl('/signup')
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
})
