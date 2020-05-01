import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Home from './Home'
import Locations from './Locations'
import Menu from './Menu'

const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/locations">
          <Locations />
        </Route>
        <Route path="/menu/:slug">
          <Menu />
        </Route>
      </Switch>
    </Router>
  )
}

export default Routes
