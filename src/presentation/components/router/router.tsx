import React, { FC } from 'react'
import Signup from '@/presentation/pages/signup/signup'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

type Props = {
  makeLogin: FC
}

const Router: FC<Props> = ({ makeLogin }: Props) => (
  <BrowserRouter>
    <Switch>
      <Route path="/login" exact component={makeLogin} />
      <Route path="/signup" exact component={Signup} />
    </Switch>
  </BrowserRouter>
)

export default Router
