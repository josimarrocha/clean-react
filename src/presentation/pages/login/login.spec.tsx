import React from 'react'
import faker from 'faker'
import { render, RenderResult, fireEvent, cleanup } from '@testing-library/react'
import { Login } from '@/presentation/pages'
import { AuthenticationSpy, ValidationStub } from '@/presentation/test'

type SutTypes = {
  sut: RenderResult
  authenticationSpy: AuthenticationSpy
}

type SutParams = {
  validationError: any
}

const makeSut = (params?: SutParams): SutTypes => {
  const validationStub = new ValidationStub()
  const authenticationSpy = new AuthenticationSpy()
  validationStub.errorMessage = params?.validationError
  const sut = render(<Login validation={validationStub} authentication={authenticationSpy} />)
  return {
    sut,
    authenticationSpy
  }
}

describe('Login component', () => {
  afterEach(cleanup)

  test('Should start with initial state', () => {
    const validationError = faker.random.words()
    const { sut } = makeSut({ validationError })
    const errorWrap = sut.getByTestId('error-wrap')
    const buttonSubmit = sut.getByTestId('submit') as HTMLButtonElement
    const emailStatus = sut.getByTestId('email-status')
    const passwordStatus = sut.getByTestId('password-status')

    expect(errorWrap.childElementCount).toBe(0)
    expect(buttonSubmit.disabled).toBeTruthy()

    expect(emailStatus.title).toBe(validationError)
    expect(emailStatus.classList.contains('error')).toBeTruthy()
    expect(passwordStatus.title).toBe(validationError)
    expect(passwordStatus.classList.contains('error')).toBeTruthy()
  })

  test('Should show email error if Validation fails', () => {
    const validationError = faker.random.words()
    const { sut } = makeSut({ validationError })
    const emailInput = sut.getByTestId('email')
    fireEvent.change(emailInput, { target: { value: faker.internet.email() } })
    const emailStatus = sut.getByTestId('email-status')
    expect(emailStatus.title).toBe(validationError)
    expect(emailStatus.classList.contains('error')).toBeTruthy()
  })

  test('Should show password error if Validation fails', () => {
    const validationError = faker.random.words()
    const { sut } = makeSut({ validationError })
    const passwordInput = sut.getByTestId('password')
    fireEvent.change(passwordInput, { target: { value: faker.internet.password() } })
    const passwordStatus = sut.getByTestId('password-status')
    expect(passwordStatus.title).toBe(validationError)
    expect(passwordStatus.classList.contains('error')).toBeTruthy()
  })

  test('Should show valid email state if Validation succeeds', () => {
    const { sut } = makeSut()
    const emailInput = sut.getByTestId('email')
    fireEvent.change(emailInput, { target: { value: faker.internet.email() } })
    const emailStatus = sut.getByTestId('email-status')
    expect(emailStatus.title).toBe('Tudo certo')
    expect(emailStatus.classList.contains('success')).toBeTruthy()
  })

  test('Should show valid password state if Validation succeeds', () => {
    const { sut } = makeSut()
    const passwordInput = sut.getByTestId('password')
    fireEvent.change(passwordInput, { target: { value: faker.internet.password() } })
    const passwordStatus = sut.getByTestId('password-status')
    expect(passwordStatus.title).toBe('Tudo certo')
    expect(passwordStatus.classList.contains('success')).toBeTruthy()
  })

  test('Should enable submit button if form is valid', () => {
    const { sut } = makeSut()
    const emailInput = sut.getByTestId('email')
    fireEvent.change(emailInput, { target: { value: faker.internet.email() } })
    const passwordInput = sut.getByTestId('password')
    fireEvent.change(passwordInput, { target: { value: faker.internet.password() } })
    const buttonSubmit = sut.getByTestId('submit') as HTMLButtonElement
    expect(buttonSubmit.disabled).toBeFalsy()
  })

  test('Should show spinner on submit', () => {
    const { sut } = makeSut()
    const emailInput = sut.getByTestId('email')
    fireEvent.change(emailInput, { target: { value: faker.internet.email() } })
    const passwordInput = sut.getByTestId('password')
    fireEvent.change(passwordInput, { target: { value: faker.internet.password() } })
    const buttonSubmit = sut.getByTestId('submit')
    fireEvent.click(buttonSubmit)
    const spinner = sut.getByTestId('spinner')
    expect(spinner).toBeTruthy()
  })

  test('Should call Authentication with corret values', () => {
    const { sut, authenticationSpy } = makeSut()
    const emailInput = sut.getByTestId('email')
    const email = faker.internet.email()
    fireEvent.change(emailInput, { target: { value: email } })
    const passwordInput = sut.getByTestId('password')
    const password = faker.internet.password()
    fireEvent.change(passwordInput, { target: { value: password } })
    const buttonSubmit = sut.getByTestId('submit')
    fireEvent.click(buttonSubmit)
    expect(authenticationSpy.params).toEqual({
      email,
      password
    })
  })
})
