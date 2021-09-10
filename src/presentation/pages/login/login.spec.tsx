import React from 'react'
import { render, RenderResult, fireEvent, cleanup } from '@testing-library/react'
import { Login } from '@/presentation/pages'
import { Validation } from '@/presentation/protocols/validation'

type SutTypes = {
  sut: RenderResult
  validationSpy: ValidationSpy
}

class ValidationSpy implements Validation {
  errorMessage: string
  input: object
  validate (input: object): string {
    this.input = input
    return this.errorMessage
  }
}

const makeSut = (): SutTypes => {
  const validationSpy = new ValidationSpy()
  const sut = render(<Login validation={validationSpy} />)
  return {
    sut,
    validationSpy
  }
}

describe('Login component', () => {
  afterEach(cleanup)

  test('Should start with initial state', () => {
    const { sut } = makeSut()
    const errorWrap = sut.getByTestId('error-wrap')
    const buttonSubmit = sut.getByTestId('submit') as HTMLButtonElement
    const emailStatus = sut.getByTestId('email-status')
    const passwordStatus = sut.getByTestId('password-status')

    expect(errorWrap.childElementCount).toBe(0)
    expect(buttonSubmit.disabled).toBeTruthy()

    expect(emailStatus.title).toBe('Campo obrigatório!')
    expect(emailStatus.classList.contains('error')).toBeTruthy()
    expect(passwordStatus.title).toBe('Campo obrigatório!')
    expect(passwordStatus.classList.contains('error')).toBeTruthy()
  })

  test('Should call Validation with correct email', () => {
    const { sut, validationSpy } = makeSut()

    const emailInput = sut.getByTestId('email')
    fireEvent.change(emailInput, { target: { value: 'any_email' } })

    expect(validationSpy.input).toEqual({
      email: 'any_email'
    })
  })

  test('Should call Validation with correct password', () => {
    const { sut, validationSpy } = makeSut()

    const passwordInput = sut.getByTestId('password')
    fireEvent.change(passwordInput, { target: { value: 'any_password' } })

    expect(validationSpy.input).toEqual({
      password: 'any_password'
    })
  })
})
