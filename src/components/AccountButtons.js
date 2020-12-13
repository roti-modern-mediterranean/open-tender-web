import React from 'react'
import { ShoppingBag, Gift, Heart, Award, Settings } from 'react-feather'
import { useHistory } from 'react-router-dom'

import NavButton from './NavButton'

const navButtons = [
  {
    icon: <Award size={null} />,
    title: 'Rewards',
    path: '/rewards',
  },
  {
    icon: <Heart size={null} />,
    title: 'Favorites',
    path: '/favorites',
  },
  {
    icon: <ShoppingBag size={null} />,
    title: 'Recent Orders & Items',
    path: '/orders',
  },
  {
    icon: <Gift size={null} />,
    title: 'Gift Cards',
    path: '/gift-cards',
  },
  {
    icon: <Settings size={null} />,
    title: 'Account Stuff',
    path: '/account/settings',
  },
]

const AccountButtons = () => {
  const history = useHistory()

  return (
    <div>
      {navButtons.map((button) => (
        <NavButton
          key={button.title}
          {...button}
          onClick={() => history.push(button.path)}
        />
      ))}
    </div>
  )
}

AccountButtons.displayName = 'AccountButtons'
export default AccountButtons
