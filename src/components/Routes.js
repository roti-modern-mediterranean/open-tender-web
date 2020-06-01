import React from 'react'
import { Switch, Route } from 'react-router-dom'
import {
  HomePage,
  LocationsPage,
  MenuPage,
  CheckoutPage,
  ConfirmationPage,
} from './pages'
import AccountPage from './AccountPage'
import OrderPage from './OrderPage'

const Routes = () => {
  return (
    <Switch>
      <Route exact path="/">
        <HomePage />
      </Route>
      <Route exact path="/locations">
        <LocationsPage />
      </Route>
      <Route path="/menu/:slug">
        <MenuPage />
      </Route>
      <Route exact path="/checkout">
        <CheckoutPage />
      </Route>
      <Route exact path="/account">
        <AccountPage />
      </Route>
      <Route exact path="/orders/:id">
        <OrderPage />
      </Route>
      <Route exact path="/confirmation">
        <ConfirmationPage />
      </Route>
    </Switch>
  )
}

export default Routes
