import styled from '@emotion/styled'
import React from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { NavButtons } from '../..'
import { selectBrand } from '../../../slices'
import iconMap from '../../iconMap'

const AccountButtonsContainer = styled('div')`
  // padding: 0 2.5rem 2.5rem;
`

const navButtons = [
  {
    icon: iconMap['ShoppingBag'],
    title: 'Order History',
    path: '/orders',
  },
  {
    icon: iconMap['Heart'],
    title: 'Favorites',
    path: '/favorites',
  },
  {
    icon: iconMap['Award'],
    title: 'Rewards',
    path: '/rewards',
  },
  {
    icon: iconMap['Gift'],
    title: 'Gift Cards',
    path: '/account/gift-cards',
  },
  {
    icon: iconMap['Settings'],
    title: 'Account Settings',
    path: '/account/settings',
  },
]

const AccountButtons = () => {
  const history = useHistory()
  const { has_rewards, has_thanx } = useSelector(selectBrand)
  const filteredButtons =
    has_rewards || has_thanx
      ? navButtons
      : navButtons.filter((i) => i.path !== '/rewards')
  const buttons = filteredButtons.map((i) => ({
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
