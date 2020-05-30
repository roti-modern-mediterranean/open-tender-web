import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux'
// import BarLoader from 'react-spinners/BarLoader'
import { selectConfig } from '../../slices/configSlice'
import Hero from '../Hero'
import { selectAccount } from '../../slices/customerSlice'
import { Button } from '../../packages'
import StickyNav from '../StickyNav'

const AccountGreeting = ({ title, subtitle }) => {
  const history = useHistory()

  const startOrder = (evt) => {
    evt.preventDefault()
    history.push('/')
    evt.target.blur()
  }

  return (
    <div className="location location--hero bg-color border-radius slide-up">
      <div className="location__content">
        <div className="location__header">
          <h2 className="ot-font-size-h5">{title}</h2>
          <p>{subtitle}</p>
        </div>
        <Button
          text="Start Order"
          ariaLabel="Start a new order"
          icon="ShoppingBag"
          onClick={startOrder}
        />
      </div>
    </div>
  )
}

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
  const account = useSelector(selectAccount)

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
    </>
  )
}

AccountPage.displayName = 'AccountPage'
export default AccountPage
