import React, { FC, useContext } from 'react'
import Spinner from '@/presentation/components/spinner/spinner'
import Styles from './form-status-styles.scss'
import { Context } from '@/presentation/contexts/form/formContext'

const FormStatus: FC = () => {
  const { isLoading, errorMessage } = useContext(Context)
  return (
    <div data-testid="error-wrap" className={Styles.errorWrap}>
      { isLoading && <Spinner className={Styles.spinner} />}
      { errorMessage && <span className={Styles.error}>Erro</span>}
    </div>
  )
}

export default FormStatus
