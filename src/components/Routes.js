import React from 'react'
import { Switch, Route } from 'react-router-dom'
import HomePage from './HomePage'
import MenuPage from './MenuPage'
import CheckoutPage from './CheckoutPage'
import ConfirmationPage from './ConfirmationPage'
import OrderPage from './OrderPage'
import RevenueCentersPage from './RevenueCentersPage'
import RevenueCenterPage from './RevenueCenterPage'
import AccountPage from './AccountPage'
import AccountAddressesPage from './AccountAddressesPage'
import AccountFavoritesPage from './AccountFavoritesPage'
import AccountOrdersPage from './AccountOrdersPage'
import AccountItemsPage from './AccountItemsPage'
import CateringPage from './CateringPage'
import SignUpPage from './SignUpPage'
import ResetPasswordPage from './ResetPasswordPage'
import NotFoundPage from './NotFoundPage'
import RefundPolicyPage from './RefundPolicyPage'
import GroupOrderGuestPage from './GroupOrderGuestPage'
import GroupOrderReviewPage from './GroupOrderReviewPage'
import AccessibilityPolicyPage from './AccessibilityPolicyPage'

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
      <Route exact path="/locations/:slug">
        <RevenueCenterPage />
      </Route>
      <Route path="/menu/:slug">
        <MenuPage />
      </Route>
      <Route path="/join/:token">
        <GroupOrderGuestPage />
      </Route>
      <Route exact path="/review">
        <GroupOrderReviewPage />
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
      <Route exact path="/accessibility">
        <AccessibilityPolicyPage />
      </Route>
      <Route exact path="/refunds">
        <RefundPolicyPage />
      </Route>
      <Route>
        <NotFoundPage />
      </Route>
    </Switch>
  )
}

export default Routes
