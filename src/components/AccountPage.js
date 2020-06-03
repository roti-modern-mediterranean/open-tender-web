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
      {/* <Hero imageUrl={background} classes="hero--right">
        <AccountGreeting title={title} subtitle={subtitle} />
      </Hero> */}
      <StickyNav items={navItems} offset={0} />
      <h1 className="sr-only">Account</h1>
      <div className="sections bg-secondary-color">
        <AccountDetails />
        <AccountAllergens />
        <AccountOrders />
      </div>
    </>
  ) : null
}

AccountPage.displayName = 'AccountPage'
export default AccountPage
