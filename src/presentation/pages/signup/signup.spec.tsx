import React from 'react'
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import { render, RenderResult, cleanup } from '@testing-library/react'
import { Signup } from '@/presentation/pages'
import { ValidationStub } from '@/presentation/test'

type SutTypes = {
  sut: RenderResult
}

type SutParams = {
  validationError: any
}

const history = createMemoryHistory({ initialEntries: ['/signup'] })

const makeSut = (params?: SutParams): SutTypes => {
  const validationStub = new ValidationStub()
  validationStub.errorMessage = params?.validationError
  const sut = render(
    <Router history={history}>
      <Signup />
    </Router>
  )
  return {
    sut
  }
}

const testStatusForField = (sut: RenderResult, fieldName: string, validationError?: string): void => {
  const fieldStatus = sut.getByTestId(`${fieldName}-status`)
  expect(fieldStatus.title).toBe(validationError ?? 'Tudo certo')
  expect(fieldStatus.classList.contains(validationError ? 'error' : 'success')).toBeTruthy()
}

const testErrorWrapChildCount = (sut: RenderResult, count: number): void => {
  const errorWrap = sut.getByTestId('error-wrap')
  expect(errorWrap.childElementCount).toBe(count)
}

const testButtonisDisabled = (sut: RenderResult, fieldName: string, isDisabled: boolean): void => {
  const button = sut.getByTestId(fieldName) as HTMLButtonElement
  expect(button.disabled).toBe(isDisabled)
}

describe('Signup component', () => {
  afterEach(cleanup)

  test('Should start with initial state', () => {
    const { sut } = makeSut()

    testErrorWrapChildCount(sut, 0)
    testButtonisDisabled(sut, 'submit', true)

    testStatusForField(sut, 'name')
    testStatusForField(sut, 'email')
    testStatusForField(sut, 'password')
    testStatusForField(sut, 'passwordConfimation')
  })
})
