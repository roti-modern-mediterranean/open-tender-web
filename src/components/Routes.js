import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
// import { TransitionGroup, CSSTransition } from 'react-transition-group'
import MenuPage from './MenuPage'
import CheckoutPage from './CheckoutPage'
import ConfirmationPage from './ConfirmationPage'
import OrderPage from './OrderPage'
import RevenueCentersPage from './RevenueCentersPage'
import RevenueCenterPage from './RevenueCenterPage'
import AccountItemsPage from './AccountItemsPage'
import CateringPage from './CateringPage'
import SignUpPage from './SignUpPage'
import ResetPasswordPage from './ResetPasswordPage'
import NotFoundPage from './NotFoundPage'
import RefundPolicyPage from './RefundPolicyPage'
import GroupOrderGuestPage from './GroupOrderGuestPage'
import GroupOrderReviewPage from './GroupOrderReviewPage'
import AccessibilityPolicyPage from './AccessibilityPolicyPage'
import LevelUpPage from './LevelUpPage'
import FulfillmentPage from './FulfillmentPage'
import DonationPage from './DonationPage'
import ThanxPage from './ThanxPage'
import {
  Account,
  AccountAddresses,
  AccountAllergens,
  AccountCreditCards,
  AccountGiftCards,
  AccountSettings,
  Favorites,
  GiftCards,
  Home,
  HouseAccounts,
  Orders,
  Rewards,
} from './pages'

// <TransitionGroup component={null}>
//   <CSSTransition timeout={10000} classNames="fade" key={location.key}>
//     <Switch location={location}>
//     </Switch>
//   </CSSTransition>
// </TransitionGroup>

const Routes = () => {
  // const location = useLocation()
  return (
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <Route exact path="/order">
        <Redirect to="/" />
      </Route>
      <Route exact path="/order/catering">
        <Redirect to="/" />
      </Route>
      <Route exact path="/levelup">
        <LevelUpPage />
      </Route>
      <Route exact path="/levelup/:token">
        <LevelUpPage />
      </Route>
      <Route exact path="/thanx/callback">
        <ThanxPage />
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
      <Route exact path="/confirmation">
        <ConfirmationPage />
      </Route>
      <Route exact path="/curbside/:id">
        <FulfillmentPage />
      </Route>
      <Route exact path="/account">
        <Account />
      </Route>
      <Route exact path="/rewards">
        <Rewards />
      </Route>
      <Route exact path="/favorites">
        <Favorites />
      </Route>
      <Route exact path="/items">
        <AccountItemsPage />
      </Route>
      <Route exact path="/orders">
        <Orders />
      </Route>
      <Route exact path="/orders/:id">
        <OrderPage />
      </Route>
      <Route exact path="/account/settings">
        <AccountSettings />
      </Route>
      <Route exact path="/account/gift-cards">
        <AccountGiftCards />
      </Route>
      <Route exact path="/account/allergens">
        <AccountAllergens />
      </Route>
      <Route exact path="/account/credit-cards">
        <AccountCreditCards />
      </Route>
      <Route exact path="/account/addresses">
        <AccountAddresses />
      </Route>
      <Route exact path="/account/house-accounts">
        <HouseAccounts />
      </Route>
      <Route exact path="/accessibility">
        <AccessibilityPolicyPage />
      </Route>
      <Route exact path="/refunds">
        <RefundPolicyPage />
      </Route>
      <Route exact path="/gift-cards">
        <GiftCards />
      </Route>
      <Route exact path="/donations">
        <DonationPage />
      </Route>
      <Route>
        <NotFoundPage />
      </Route>
    </Switch>
  )
}

export default Routes
