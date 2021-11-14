import React, { FC, useContext, FocusEvent } from 'react'
import Styles from './input-styles.scss'
import { Context } from '@/presentation/contexts/form/formContext'

type Props = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

const Input: FC<Props> = (props: Props) => {
  const { state, setState } = useContext(Context)
  const error = state[`${props.name}Error`]

  const handleChange = (e: FocusEvent<HTMLInputElement>): void => {
    setState({ ...state, [e.target.name]: e.target.value })
  }

  return (
    <div
      className={Styles.inputWrap}
      data-status={error ? 'invalid' : 'valid'}
      data-testid={`${props.name}-wrap`}
    >
      <input {...props} hidden />
      <input
        {...props}
        placeholder=" "
        title={error}
        id={props.name}
        data-testid={props.name}
        onChange={handleChange}
      />
      <label
        htmlFor={props.name}
        title={error}
        data-testid={`${props.name}-label`}
      >
        {props.placeholder}
      </label>
    </div>
  )
}

export default Input
