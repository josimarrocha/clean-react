import faker from 'faker'
import { RenderResult, fireEvent } from '@testing-library/react'

export const populateField = (sut: RenderResult, fieldName: string, value: string = faker.internet.email()): void => {
  const input = sut.getByTestId(fieldName)
  fireEvent.change(input, { target: { value } })
}

export const testStatusForField = (sut: RenderResult, fieldName: string, validationError?: string): void => {
  const fieldStatus = sut.getByTestId(`${fieldName}-status`)
  expect(fieldStatus.title).toBe(validationError ?? 'Tudo certo')
  expect(fieldStatus.classList.contains(validationError ? 'error' : 'success')).toBeTruthy()
}

export const testChildCount = (sut: RenderResult, fieldName: string, count: number): void => {
  const el = sut.getByTestId(fieldName)
  expect(el.childElementCount).toBe(count)
}

export const testButtonisDisabled = (sut: RenderResult, fieldName: string, isDisabled: boolean): void => {
  const button = sut.getByTestId(fieldName) as HTMLButtonElement
  expect(button.disabled).toBe(isDisabled)
}

export const testElementExists = (sut: RenderResult, fieldName: string): void => {
  const el = sut.getByTestId(fieldName)
  expect(el).toBeTruthy()
}

export const testElementText = (sut: RenderResult, fieldName: string, text: string): void => {
  const el = sut.getByTestId(fieldName)
  expect(el.textContent).toBe(text)
}
