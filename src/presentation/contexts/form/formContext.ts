import { createContext } from 'react'

export type StateForm = {
  state: {
    isLoading?: boolean
  }
  errorState: {
    email?: string
    password?: string
    main?: string
  }
}

export const Context = createContext<StateForm>({
  errorState: {},
  state: {}
})
