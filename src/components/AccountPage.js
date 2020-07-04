import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { selectCustomer, fetchCustomer } from 'open-tender-redux'

import { selectConfig } from '../slices'
import StickyNav from './StickyNav'
import Hero from './Hero'
import AccountGreeting from './AccountGreeting'
import AccountOrders from './AccountOrders'
import AccountProfile from './AccountProfile'
import AccountAllergens from './AccountAllergens'
import AccountAddresses from './AccountAddresses'
import AccountGiftCards from './AccountGiftCards'
import AccountCreditCards from './AccountCreditCards'
import AccountItems from './AccountItems'
import AccountFavorites from './AccountFavorites'
import AccountHouseAccounts from './AccountHouseAccounts'

const AccountPage = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const { account: accountConfig } = useSelector(selectConfig)
  const { background, title, subtitle, sections } = accountConfig
  const navItems = Object.values(sections).map((section) => section.title)
  const { auth, profile } = useSelector(selectCustomer)
  const token = auth ? auth.access_token : null

  useEffect(() => {
    window.scroll(0, 0)
  }, [])

  useEffect(() => {
    if (!token) return history.push('/')
    dispatch(fetchCustomer({ token }))
  }, [token, dispatch, history])

  return profile ? (
    <>
      <h1 className="sr-only">Account</h1>
      <Hero imageUrl={background} classes="hero--auto transition">
        <AccountGreeting title={title} subtitle={subtitle} />
      </Hero>
      <div className="bg-secondary-color">
        <StickyNav items={navItems} offset={-90} />
        <div className="sections">
          <AccountFavorites />
          <AccountOrders />
          <AccountItems />
          <AccountProfile />
          <AccountAllergens />
          <AccountAddresses />
          <AccountGiftCards />
          <AccountCreditCards />
          <AccountHouseAccounts />
        </div>
      </div>
    </>
  ) : null
}

AccountPage.displayName = 'AccountPage'
export default AccountPage
