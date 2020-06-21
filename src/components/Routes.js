import React from 'react'
import { Switch, Route } from 'react-router-dom'
import HomePage from './HomePage'
import MenuPage from './MenuPage'
import CheckoutPage from './CheckoutPage'
import ConfirmationPage from './ConfirmationPage'
import OrderPage from './OrderPage'
import RevenueCentersPage from './RevenueCentersPage'
import AccountPage from './AccountPage'
import AccountAddressesPage from './AccountAddressesPage'
import AccountFavoritesPage from './AccountFavoritesPage'
import AccountOrdersPage from './AccountOrdersPage'
import AccountItemsPage from './AccountItemsPage'
import CateringPage from './CateringPage'
import SignUpPage from './SignUpPage'
import ResetPasswordPage from './ResetPasswordPage'

const Routes = () => {
  return (
    <Switch>
      <Route exact path="/">
        <HomePage />
      </Route>
      <Route exact path="/signup">
        <SignUpPage />
      </Route>
      <Route exact path="/reset-password">
        <ResetPasswordPage />
      </Route>
      <Route exact path="/catering">
        <CateringPage />
      </Route>
      <Route exact path="/locations">
        <RevenueCentersPage />
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
