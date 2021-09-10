import React, { FC, useContext } from 'react'
import Styles from './input-styles.scss'
import { Context } from '@/presentation/contexts/form/formContext'

type Props = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

const Input: FC<Props> = (props: Props) => {
  const { errorState } = useContext(Context)
  return (
    <div className={Styles.inputWrap}>
      <input {...props} hidden />
      <input {...props} />
      <span title={errorState[props.name ?? '']} data-testid={`${props.name}-status`} className={[Styles.status, Styles.error].join(' ')}></span>
    </div>
  )
}

export default Input
