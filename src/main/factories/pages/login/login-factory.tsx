import React, { FC } from 'react'
import { Login } from '@/presentation/pages'
import { AxiosHttpClient } from '@/infra/http/axios-http-client/axios-http-client'
import { RemoteAuthentication } from '@/data/usecases/authentication/remote-authentication'
import { ValidationComposite } from '@/validation/validators'
import { ValidationBuilder } from '@/validation/validators/validation-builder/validation-builder'

export const makeLogin: FC = () => {
  const url = 'http://fordevs.herokuapp.com/api/login'
  const axiosHttpClient = new AxiosHttpClient()
  const remoteAuthentication = new RemoteAuthentication(url, axiosHttpClient)
  const validationComposite = ValidationComposite.build([
    ...ValidationBuilder.field('email').require().email().build(),
    ...ValidationBuilder.field('password').require().min(5).build()
  ])

  return (
    <Login
      authentication={remoteAuthentication}
      validation={validationComposite}
    />
  )
}
