import React from 'react'
import { render } from '@testing-library/react'
import { Login } from '@/presentation/pages'

describe('Login component', () => {
  test('Should start with initial state', () => {
    const { getByTestId } = render(<Login />)
    const errorWrap = getByTestId('error-wrap')
    const buttonSubmit = getByTestId('submit') as HTMLButtonElement

    expect(errorWrap.childElementCount).toBe(0)
    expect(buttonSubmit.disabled).toBeTruthy()
  })
})
