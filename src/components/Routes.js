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
import AccountAddressesPage from './AccountAddressesPage'
import OrderPage from './OrderPage'
import AccountFavoritesPage from './AccountFavoritesPage'
import AccountOrdersPage from './AccountOrdersPage'
import AccountItemsPage from './AccountItemsPage'

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
      <Route exact path="/addresses">
        <AccountAddressesPage />
      </Route>
      <Route exact path="/favorites">
        <AccountFavoritesPage />
      </Route>
      <Route exact path="/items">
        <AccountItemsPage />
      </Route>
      <Route exact path="/orders">
        <AccountOrdersPage />
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
