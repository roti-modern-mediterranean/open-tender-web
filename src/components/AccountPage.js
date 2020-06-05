import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectConfig } from '../slices/configSlice'
import { selectCustomer } from '../slices/customerSlice'
import StickyNav from './StickyNav'
import Hero from './Hero'
import AccountGreeting from './AccountGreeting'
import AccountOrders from './AccountOrders'
import AccountDetails from './AccountDetails'
import AccountAllergens from './AccountAllergens'
import AccountAddresses from './AccountAddresses'
import AccountGiftCards from './AccountGiftCards'
import AccountCreditCards from './AccountCreditCards'

const AccountPage = () => {
  const history = useHistory()
  const { account: accountConfig } = useSelector(selectConfig)
  const { background, title, subtitle, sections } = accountConfig
  const { account } = useSelector(selectCustomer)

  useEffect(() => {
    window.scroll(0, 0)
  }, [])

  useEffect(() => {
    if (!account) return history.push('/')
  }, [account, history])

  const navItems = Object.values(sections).map((section) => section.title)

  return account ? (
    <>
      <Hero imageUrl={background} classes="">
        <AccountGreeting title={title} subtitle={subtitle} />
      </Hero>
      <div className="bg-secondary-color">
        <StickyNav items={navItems} offset={-90} />
        <h1 className="sr-only">Account</h1>
        <div className="sections">
          <AccountOrders />
          <AccountAllergens />
          <AccountDetails />
          <AccountAddresses />
          <AccountGiftCards />
          <AccountCreditCards />
        </div>
      </div>
    </>
  ) : null
}

AccountPage.displayName = 'AccountPage'
export default AccountPage
