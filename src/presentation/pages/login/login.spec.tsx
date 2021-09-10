import React from 'react'
import { render } from '@testing-library/react'
import { Login } from '@/presentation/pages'

describe('Login component', () => {
  test('Should start with initial state', () => {
    const { getByTestId } = render(<Login />)
    const errorWrap = getByTestId('error-wrap')
    const buttonSubmit = getByTestId('submit') as HTMLButtonElement
    const emailStatus = getByTestId('email-status')
    const passwordStatus = getByTestId('password-status')

    expect(errorWrap.childElementCount).toBe(0)
    expect(buttonSubmit.disabled).toBeTruthy()

    expect(emailStatus.title).toBe('Campo obrigatório!')
    expect(emailStatus.classList.contains('error')).toBeTruthy()
    expect(passwordStatus.title).toBe('Campo obrigatório!')
    expect(passwordStatus.classList.contains('error')).toBeTruthy()
  })
})
