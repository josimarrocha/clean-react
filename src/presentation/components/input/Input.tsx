import React, { FC, useContext, FocusEvent } from 'react'
import Styles from './input-styles.scss'
import { Context } from '@/presentation/contexts/form/formContext'

type Props = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

const Input: FC<Props> = (props: Props) => {
  const { state, setState } = useContext(Context)

  const getTitle = (): string => {
    return state[`${props.name}Error`] || 'Tudo certo'
  }

  const getCurrentStatus = (): string => {
    return state[`${props.name}Error`] ? Styles.error : Styles.success
  }

  const handleChange = (event: FocusEvent<HTMLInputElement>): void => {
    setState({
      ...state,
      [event.target.name]: event.target.value
    })
  }

  return (
    <div className={Styles.inputWrap}>
      <input {...props} hidden />
      <input data-testid={props.name} {...props} onChange={handleChange} />
      <span
        title={getTitle()}
        data-testid={`${props.name}-status`}
        className={[Styles.status, getCurrentStatus()].join(' ')} />
    </div>
  )
}

export default Input
