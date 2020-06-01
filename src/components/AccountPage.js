import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectConfig } from '../slices/configSlice'
import { selectCustomer } from '../slices/customerSlice'
import Hero from './Hero'
import StickyNav from './StickyNav'
import AccountGreeting from './AccountGreeting'
import AccountPastOrders from './AccountPastOrders'
import AccountUpcomingOrders from './AccountUpcomingOrders'

const navItems = [
  'Loyalty & Discounts',
  'Past Orders',
  'Favorites',
  'Account Details',
  'Allergens',
  'Addresses',
  'Gift Cards',
  'Payment Methods',
]

const AccountPage = () => {
  const history = useHistory()
  const { account: accountConfig } = useSelector(selectConfig)
  const { account } = useSelector(selectCustomer)

  useEffect(() => {
    if (!account) history.push('/')
    window.scroll(0, 0)
  }, [account, history])

  return (
    <>
      <Hero imageUrl={accountConfig.background} classes="hero--right">
        <AccountGreeting
          title={accountConfig.title}
          subtitle={accountConfig.subtitle}
        />
      </Hero>
      <StickyNav items={navItems} offset={0} />
      <h1 className="sr-only">Account</h1>
      <div className="sections">
        <AccountUpcomingOrders />
        <AccountPastOrders />
      </div>
    </>
  )
}

AccountPage.displayName = 'AccountPage'
export default AccountPage
