import React, { FC, useState } from 'react'
import Styles from './login-styles.scss'
import { LoginHeader, Footer, FormStatus, Input } from '@/presentation/components'
import { Context } from '@/presentation/contexts/form/formContext'

const Login: FC = () => {
  const [state] = useState({
    isLoading: false,
    errorMessage: ''
  })

  const [errorState] = useState({
    email: 'Campo obrigatório!',
    password: 'Campo obrigatório!',
    errorMessage: ''
  })

  return (
    <div className={Styles.login}>
      <LoginHeader />
      <Context.Provider value={{ state, errorState }}>
        <form action="" className={Styles.form} autoComplete="off">
          <h2>Login</h2>
          <Input type="email" name="email" placeholder="Digite seu e-mail" />
          <Input type="password" name="password" placeholder="Digite sua senha" />
          <button data-testid="submit" disabled className={Styles.submit} type="submit">Entrar</button>
          <span className={Styles.link}>Criar conta</span>
          <FormStatus />
        </form>
      </Context.Provider>
      <Footer />
    </div>
  )
}

export default Login
