import React, { useEffect } from 'react'
import { Helmet } from 'react-helmet'
import { useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { isBrowser } from 'react-device-detect'
import { selectCustomer, fetchCustomer } from '@open-tender/redux'

import { selectBrand, selectConfig, selectSettings } from '../slices'
import StickyNav from './StickyNav'
import Background from './Background'
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
import AccountGroupOrders from './AccountGroupOrders'
import AccountLevelUp from './AccountLevelUp'
import Hero from './Hero'
import AccountThanx from './AccountThanx'

const sections = {
  favorites: <AccountFavorites />,
  recentOrders: <AccountOrders />,
  groupOrders: <AccountGroupOrders />,
  recentItems: <AccountItems />,
  profile: <AccountProfile />,
  allergens: <AccountAllergens />,
  addresses: <AccountAddresses />,
  giftCards: <AccountGiftCards />,
  creditCards: <AccountCreditCards />,
  houseAccounts: <AccountHouseAccounts />,
  levelup: <AccountLevelUp />,
}

const AccountSection = ({ section }) => sections[section]

const AccountPage = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const { title: siteTitle, has_thanx } = useSelector(selectBrand)
  const { account: accountConfig } = useSelector(selectConfig)
  const { background, title } = accountConfig
  const { accountSections } = useSelector(selectSettings)
  let navItems = Object.values(accountSections)
    .filter((i) => i !== 'groupOrders')
    .map((i) => accountConfig[i].title)
  if (has_thanx) navItems = ['Rewards', ...navItems]
  const { auth, profile } = useSelector(selectCustomer)
  const token = auth ? auth.access_token : null

  useEffect(() => {
    window.scroll(0, 0)
  }, [])

  useEffect(() => {
    if (!token) return history.push('/')
    dispatch(fetchCustomer({ token }))
  }, [token, dispatch, history])

  return (
    <>
      <Helmet>
        <title>Account | {siteTitle}</title>
      </Helmet>
      {isBrowser && <Background imageUrl={background} />}
      <div className="content">
        {profile && (
          <>
            <Hero imageUrl={background} classes="hero--auto" overlay={true}>
              <AccountGreeting />
            </Hero>
            <StickyNav items={navItems} offset={-110} />
            <div className="sections ot-bg-color-secondary">
              {has_thanx && <AccountThanx />}
              {accountSections.map((section) => (
                <AccountSection key={section} section={section} />
              ))}
            </div>
          </>
        )}
      </div>
    </>
  )
}

AccountPage.displayName = 'AccountPage'
export default AccountPage
