import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectConfig } from '../slices/configSlice'
import { selectCustomer } from '../slices/customerSlice'
import Hero from './Hero'
import StickyNav from './StickyNav'
import AccountGreeting from './AccountGreeting'
import AccountOrders from './AccountOrders'

// const navItems = [
//   'Loyalty & Discounts',
//   'Past Orders',
//   'Favorites',
//   'Account Details',
//   'Allergens',
//   'Addresses',
//   'Gift Cards',
//   'Payment Methods',
// ]

const AccountPage = () => {
  const history = useHistory()
  const { account: accountConfig } = useSelector(selectConfig)
  const { background, title, subtitle, sections } = accountConfig
  const { account } = useSelector(selectCustomer)

  useEffect(() => {
    if (!account) history.push('/')
    window.scroll(0, 0)
  }, [account, history])

  const navItems = Object.values(sections).map((section) => section.title)

  return (
    <>
      <Hero imageUrl={background} classes="hero--right">
        <AccountGreeting title={title} subtitle={subtitle} />
      </Hero>
      <StickyNav items={navItems} offset={0} />
      <h1 className="sr-only">Account</h1>
      <div className="sections">
        <AccountOrders />
      </div>
    </>
  )
}

AccountPage.displayName = 'AccountPage'
export default AccountPage
