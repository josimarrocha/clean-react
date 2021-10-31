import React, { FC, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Styles from './signup-styles.scss'
import { LoginHeader, Footer, FormStatus, Input } from '@/presentation/components'
import { Context } from '@/presentation/contexts/form/formContext'
import { Validation } from '@/presentation/protocols/validation'
import { AddAccount } from '@/domains/usecases'

type Props = {
  validation: Validation
  addAccount: AddAccount
}

const Signup: FC<Props> = ({ validation, addAccount }) => {
  const [state, setState] = useState({
    isLoading: false,
    errorMessage: '',
    name: '',
    email: '',
    password: '',
    passwordConfimation: '',
    nameError: '',
    emailError: '',
    passwordError: '',
    passwordConfimationError: ''
  })

  useEffect(() => {
    setState({
      ...state,
      nameError: validation.validate('name', state.name),
      emailError: validation.validate('email', state.email),
      passwordError: validation.validate('password', state.password),
      passwordConfimationError: validation.validate('passwordConfimation', state.passwordConfimation)
    })
  }, [state.name, state.email, state.password, state.passwordConfimation])

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault()
    if (state.isLoading || isDisabledButton()) return

    setState({ ...state, isLoading: true })
    await addAccount.add({
      name: state.name,
      email: state.email,
      password: state.password,
      passwordConfirmation: state.passwordConfimation
    })
  }

  const isDisabledButton = (): boolean => !!state.nameError || !!state.emailError || !!state.passwordError || !!state.passwordConfimationError

  return (
    <div className={Styles.signup}>
      <LoginHeader />
      <Context.Provider value={{ state, setState }}>
        <form data-testid="form" className={Styles.form} autoComplete="off" onSubmit={handleSubmit}>
          <h2>Cria Conta</h2>
          <Input type="text" name="name" placeholder="Digite seu nome" />
          <Input type="email" name="email" placeholder="Digite seu e-mail" />
          <Input type="password" name="password" placeholder="Digite sua senha" />
          <Input type="password" name="passwordConfimation" placeholder="Repita sua senha" />
          <button data-testid="submit" disabled={isDisabledButton()} className={Styles.submit} type="submit">Criar</button>
          <Link to="/login" className={Styles.link}>voltar para o login</Link>
          <FormStatus />
        </form>
      </Context.Provider>
      <Footer />
    </div>
  )
}

export default Signup
