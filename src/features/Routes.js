import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
// import Home from './home/Home'
import Locations from './locations/Locations'

const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route path="/">
          {/* <Home /> */}
          <Locations />
        </Route>
      </Switch>
    </Router>
  )
}

export default Routes
