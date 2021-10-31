import React, { FC } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

type Props = {
  makeLogin: FC
  makeSignup: FC
}

const Router: FC<Props> = ({ makeLogin, makeSignup }: Props) => (
  <BrowserRouter>
    <Switch>
      <Route path="/login" exact component={makeLogin} />
      <Route path="/signup" exact component={makeSignup} />
    </Switch>
  </BrowserRouter>
)

export default Router
