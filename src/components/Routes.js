import React from 'react'
import { Switch, Route } from 'react-router-dom'
import HomePage from './HomePage'
import LocationsPage from './LocationsPage'
import MenuPage from './MenuPage'

const Routes = () => {
  return (
    <Switch>
      <Route exact path="/">
        <HomePage />
      </Route>
      <Route path="/locations">
        <LocationsPage />
      </Route>
      <Route path="/menu/:slug">
        <MenuPage />
      </Route>
    </Switch>
  )
}

export default Routes
