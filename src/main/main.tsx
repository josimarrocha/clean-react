import React from 'react'
import ReactDOM from 'react-dom'
import { Router } from '@/presentation/components'
import { makeLogin } from './factories/pages/login/login-factory'
import { makeSignup } from './factories/pages/signup/signup-factories'
import '@/presentation/styles/globals.scss'

ReactDOM.render(<Router
  makeLogin={makeLogin}
  makeSignup={makeSignup}
/>, document.getElementById('main'))
