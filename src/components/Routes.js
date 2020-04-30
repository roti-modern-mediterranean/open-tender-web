import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Home from './Home'
import Locations from './Locations'

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
      </Switch>
    </Router>
  )
}

export default Routes
