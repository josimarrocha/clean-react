import React, { FC } from 'react'
import Styles from './input-styles.scss'

type Props = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

const Input: FC<Props> = (props: Props) => (
  <div className={Styles.inputWrap}>
    <input {...props} hidden />
    <input {...props} />
    <span className={Styles.status}></span>
  </div>
)

export default Input
