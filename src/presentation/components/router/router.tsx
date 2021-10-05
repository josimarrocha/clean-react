import React, { FC } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

type Props = {
  makeLogin: FC
}

const Router: FC<Props> = ({ makeLogin }: Props) => (
  <BrowserRouter>
    <Switch>
      <Route path="/login" exact component={makeLogin} />
    </Switch>
  </BrowserRouter>
)

export default Router
