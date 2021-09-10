import { createContext, SetStateAction } from 'react'

export type StateForm = {
  state: {
    isLoading?: boolean
    errorMessage?: string
    emailError?: string
    passwordError?: string
  }
  setState?: SetStateAction<any>
}

export const Context = createContext<StateForm>({
  state: {},
  setState: {}
})
