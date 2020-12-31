import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
// import { TransitionGroup, CSSTransition } from 'react-transition-group'
import CheckoutPage from './CheckoutPage'
import ConfirmationPage from './ConfirmationPage'
import RevenueCenterPage from './RevenueCenterPage'
import ResetPasswordPage from './ResetPasswordPage'
import NotFoundPage from './NotFoundPage'
import RefundPolicyPage from './RefundPolicyPage'
import LevelUpPage from './LevelUpPage'
import ThanxPage from './ThanxPage'
import {
  Accessibility,
  Account,
  AccountAddresses,
  AccountAllergens,
  AccountCreditCards,
  AccountGiftCards,
  AccountSettings,
  Catering,
  Donations,
  Favorites,
  Fulfillment,
  GiftCards,
  GroupOrderGuest,
  GroupOrderReview,
  GroupOrders,
  Home,
  HouseAccounts,
  Menu,
  Orders,
  Order,
  Profile,
  RevenueCenters,
  Rewards,
  SignUp,
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
        <SignUp />
      </Route>
      <Route exact path="/reset-password">
        <ResetPasswordPage />
      </Route>
      <Route exact path="/catering">
        <Catering />
      </Route>
      <Route exact path="/locations">
        <RevenueCenters />
      </Route>
      <Route exact path="/locations/:slug">
        <RevenueCenterPage />
      </Route>
      <Route path="/menu/:slug">
        <Menu />
      </Route>
      <Route path="/join/:token">
        <GroupOrderGuest />
      </Route>
      <Route exact path="/review">
        <GroupOrderReview />
      </Route>
      <Route exact path="/checkout">
        <CheckoutPage />
      </Route>
      <Route exact path="/confirmation">
        <ConfirmationPage />
      </Route>
      <Route exact path="/curbside/:id">
        <Fulfillment />
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
      <Route exact path="/orders">
        <Orders />
      </Route>
      <Route exact path="/orders/:id">
        <Order />
      </Route>
      <Route exact path="/group-orders">
        <GroupOrders />
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
      <Route exact path="/account/profile">
        <Profile />
      </Route>
      <Route exact path="/accessibility">
        <Accessibility />
      </Route>
      <Route exact path="/refunds">
        <RefundPolicyPage />
      </Route>
      <Route exact path="/gift-cards">
        <GiftCards />
      </Route>
      <Route exact path="/donations">
        <Donations />
      </Route>
      <Route>
        <NotFoundPage />
      </Route>
    </Switch>
  )
}

export default Routes
