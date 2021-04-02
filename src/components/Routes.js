import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import {
  Accessibility,
  AccountAddresses,
  AccountAllergens,
  AccountCreditCards,
  AccountGiftCards,
  Catering,
  Checkout,
  CheckoutDetails,
  CheckoutLogin,
  CheckoutRegister,
  Confirmation,
  Deals,
  Donations,
  Favorites,
  Fulfillment,
  GiftCards,
  GroupOrderGuest,
  GroupOrderReview,
  GroupOrders,
  Home,
  HouseAccounts,
  LevelUp,
  Menu,
  MenuItem,
  NotFound,
  Order,
  Orders,
  OrderType,
  Profile,
  Rating,
  Refunds,
  ResetPassword,
  RevenueCenters,
  RevenueCenter,
  Rewards,
  SignUp,
  Terms,
  Thanx,
  VerifyAccount,
} from './pages'

const Routes = () => {
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
        <LevelUp />
      </Route>
      <Route exact path="/levelup/:token">
        <LevelUp />
      </Route>
      <Route exact path="/thanx/callback">
        <Thanx />
      </Route>
      <Route exact path="/order-type">
        <OrderType />
      </Route>
      <Route exact path="/signup">
        <SignUp />
      </Route>
      <Route exact path="/reset-password">
        <ResetPassword />
      </Route>
      <Route exact path="/verify">
        <VerifyAccount />
      </Route>
      <Route exact path="/catering">
        <Catering />
      </Route>
      <Route exact path="/locations">
        <RevenueCenters />
      </Route>
      <Route exact path="/locations/:slug">
        <RevenueCenter />
      </Route>
      <Route exact path="/menu/:slug">
        <Menu />
      </Route>
      <Route path="/menu/:slug/item/:itemSlug">
        <MenuItem />
      </Route>
      <Route path="/join/:token">
        <GroupOrderGuest />
      </Route>
      <Route exact path="/review">
        <GroupOrderReview />
      </Route>
      <Route exact path="/checkout">
        <Checkout />
      </Route>
      <Route exact path="/checkout/login">
        <CheckoutLogin />
      </Route>
      <Route exact path="/checkout/register">
        <CheckoutRegister />
      </Route>
      <Route exact path="/checkout/details">
        <CheckoutDetails />
      </Route>
      <Route exact path="/confirmation">
        <Confirmation />
      </Route>
      <Route exact path="/curbside/:id">
        <Fulfillment />
      </Route>
      <Route exact path="/ratings/:id">
        <Rating />
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
      <Route exact path="/profile">
        <Profile />
      </Route>
      <Route exact path="/nutrition">
        <AccountAllergens />
      </Route>
      <Route exact path="/addresses">
        <AccountAddresses />
      </Route>
      <Route exact path="/credit-cards">
        <AccountCreditCards />
      </Route>
      <Route exact path="/gift-cards">
        <AccountGiftCards />
      </Route>
      <Route exact path="/house-accounts">
        <HouseAccounts />
      </Route>
      <Route exact path="/gift-cards">
        <GiftCards />
      </Route>
      <Route exact path="/donations">
        <Donations />
      </Route>
      <Route exact path="/deals">
        <Deals />
      </Route>
      <Route exact path="/terms">
        <Terms />
      </Route>
      <Route exact path="/refunds">
        <Refunds />
      </Route>
      <Route exact path="/accessibility">
        <Accessibility />
      </Route>
      <Route>
        <NotFound />
      </Route>
    </Switch>
  )
}

export default Routes
