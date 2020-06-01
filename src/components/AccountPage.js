import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
// import BarLoader from 'react-spinners/BarLoader'
import { selectConfig } from '../slices/configSlice'
import { selectCustomer } from '../slices/customerSlice'
import {
  selectAccount,
  fetchUpcomingOrders,
  fetchPastOrders,
} from '../slices/accountSlice'
import Hero from './Hero'
import StickyNav from './StickyNav'
import AccountGreeting from './AccountGreeting'
import AccountPastOrders from './AccountPastOrders'

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
  const dispatch = useDispatch()
  const { account: accountConfig } = useSelector(selectConfig)
  const { auth, account } = useSelector(selectCustomer)
  const { access_token: token } = auth || {}
  const { upcomingOrders } = useSelector(selectAccount)
  // console.log(upcomingOrders)

  useEffect(() => {
    if (!account) history.push('/')
    window.scroll(0, 0)
  }, [account, history])

  useEffect(() => {
    dispatch(fetchUpcomingOrders({ token }))
  }, [dispatch, token])

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
        <AccountPastOrders />
      </div>
    </>
  )
}

AccountPage.displayName = 'AccountPage'
export default AccountPage
