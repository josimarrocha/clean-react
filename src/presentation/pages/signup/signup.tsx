import React, { FC } from 'react'
import { Link } from 'react-router-dom'
import Styles from './signup-styles.scss'
import { LoginHeader, Footer, FormStatus, Input } from '@/presentation/components'
import { Context } from '@/presentation/contexts/form/formContext'

const Signup: FC = () => {
  return (
    <div className={Styles.signup}>
      <LoginHeader />
      <Context.Provider value={{ state: {} }}>
        <form className={Styles.form} autoComplete="off">
          <h2>Cria Conta</h2>
          <Input type="text" name="name" placeholder="Digite seu nome" />
          <Input type="email" name="email" placeholder="Digite seu e-mail" />
          <Input type="password" name="password" placeholder="Digite sua senha" />
          <Input type="password" name="passwordConfimation" placeholder="Repita sua senha" />
          <button className={Styles.submit} type="submit">Criar</button>
          <Link to="/login" className={Styles.link}>voltar para o login</Link>
          <FormStatus />
        </form>
      </Context.Provider>
      <Footer />
    </div>
  )
}

export default Signup
