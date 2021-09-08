import React, { FC, memo } from 'react'
import Styles from './login-header-styles.scss'
import Logo from '@/assets/images/logo.svg'

type Props = React.HTMLAttributes<HTMLElement>

const LoginHeader: FC<Props> = (props: Props) => (
  <header className={Styles.header}>
    <img src={Logo} alt="" />
    <h1>4Dev - Enquetes para programadores</h1>
  </header>
)

export default memo(LoginHeader)
