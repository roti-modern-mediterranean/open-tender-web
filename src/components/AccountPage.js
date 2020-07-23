import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { isBrowser } from 'react-device-detect'
import { selectCustomer, fetchCustomer } from '@open-tender/redux'

import { selectConfig, selectSettings } from '../slices'
import StickyNav from './StickyNav'
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
import Background from './Background'
import PageTitle from './PageTitle'

const sections = {
  favorites: <AccountFavorites />,
  recentOrders: <AccountOrders />,
  recentItems: <AccountItems />,
  profile: <AccountProfile />,
  allergens: <AccountAllergens />,
  addresses: <AccountAddresses />,
  giftCards: <AccountGiftCards />,
  creditCards: <AccountCreditCards />,
  houseAccounts: <AccountHouseAccounts />,
}

const AccountSection = ({ section }) => sections[section]

const AccountPage = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const { account: accountConfig } = useSelector(selectConfig)
  const { background, title, subtitle } = accountConfig
  const { accountSections } = useSelector(selectSettings)
  const navItems = Object.values(accountSections).map(
    (section) => accountConfig[section].title
  )
  const { auth, profile } = useSelector(selectCustomer)
  const token = auth ? auth.access_token : null
  const pageTitle = profile ? `${title}, ${profile.first_name}` : ''

  useEffect(() => {
    window.scroll(0, 0)
  }, [])

  useEffect(() => {
    if (!token) return history.push('/')
    dispatch(fetchCustomer({ token }))
  }, [token, dispatch, history])

  return profile ? (
    <>
      {isBrowser && <Background imageUrl={background} />}
      <div className="content">
        <PageTitle title={pageTitle} subtitle={subtitle} />
        <AccountGreeting />
        <StickyNav items={navItems} offset={-90} />
        <div className="sections">
          {accountSections.map((section) => (
            <AccountSection key={section} section={section} />
          ))}
        </div>
      </div>
    </>
  ) : null
}

AccountPage.displayName = 'AccountPage'
export default AccountPage
