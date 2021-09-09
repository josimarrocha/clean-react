import { createContext } from 'react'
import { StateProps } from '@/presentation/pages/login/login'

export const Context = createContext<StateProps>({
  isLoading: false,
  errorMessage: ''
})
