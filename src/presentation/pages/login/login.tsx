import React, { FC } from 'react'
import Styles from './login-styles.scss'
import Header from '@/presentation/components/loginHeader/LoginHeader'
import Footer from '@/presentation/components/footer/Footer'
import Input from '@/presentation/components/input/Input'
import FormStatus from '@/presentation/components/formStatus/FormStatus'

const Login: FC = () => {
  return (
    <div className={Styles.login}>
      <Header />
      <form action="" className={Styles.form}>
        <h2>Login</h2>
        <Input type="email" name="email" placeholder="Digite seu e-mail"/>
        <Input type="password" name="password" placeholder="Digite sua senha"/>
        <button className={Styles.submit} type="submit">Entrar</button>
        <span className={Styles.link}>Criar conta</span>
        <FormStatus />
      </form>
      <Footer/>
    </div>
  )
}

export default Login
