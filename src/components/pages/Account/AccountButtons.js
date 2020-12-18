import styled from '@emotion/styled'
import React from 'react'
import { ShoppingBag, Gift, Heart, Award, Settings } from 'react-feather'
import { useHistory } from 'react-router-dom'
import { NavButtons } from '../..'

const AccountButtonsContainer = styled('div')`
  // padding: 0 2.5rem 2.5rem;
`

const navButtons = [
  {
    icon: <ShoppingBag size={null} />,
    title: 'Order History',
    path: '/orders',
  },
  {
    icon: <Heart size={null} />,
    title: 'Favorites',
    path: '/favorites',
  },
  {
    icon: <Award size={null} />,
    title: 'Rewards',
    path: '/rewards',
  },
  {
    icon: <Gift size={null} />,
    title: 'Gift Cards',
    path: '/gift-cards',
  },
  {
    icon: <Settings size={null} />,
    title: 'Account',
    path: '/account/settings',
  },
]

const AccountButtons = () => {
  const history = useHistory()
  const buttons = navButtons.map((i) => ({
    ...i,
    onClick: () => history.push(i.path),
  }))

  return (
    <AccountButtonsContainer>
      <NavButtons buttons={buttons} />
    </AccountButtonsContainer>
  )
}

AccountButtons.displayName = 'AccountButtons'
export default AccountButtons
