import React, { FC, useContext } from 'react'
import Spinner from '@/presentation/components/spinner/spinner'
import Styles from './form-status-styles.scss'
import { Context } from '@/presentation/contexts/form/formContext'

const FormStatus: FC = () => {
  const { state } = useContext(Context)
  return (
    <div data-testid="error-wrap" className={Styles.errorWrap}>
      { state.isLoading && <Spinner className={Styles.spinner} />}
      { state.errorMessage && <span data-testid="main-error" className={Styles.error}>{state.errorMessage}</span>}
    </div>
  )
}

export default FormStatus
