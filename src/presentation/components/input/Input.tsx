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

  const handleChange = (e: FocusEvent<HTMLInputElement>): void => {
    setState({ ...state, [e.target.name]: e.target.value })
  }

  return (
    <div className={Styles.inputWrap}>
      <input {...props} hidden />
      <input
        {...props}
        placeholder=" "
        id={props.name}
        data-testid={props.name}
        onChange={handleChange}
      />
      <label htmlFor={props.name}>
        {props.placeholder}
      </label>
      <span
        title={getTitle()}
        data-testid={`${props.name}-status`}
        className={[Styles.status, getCurrentStatus()].join(' ')} />
    </div>
  )
}

export default Input
