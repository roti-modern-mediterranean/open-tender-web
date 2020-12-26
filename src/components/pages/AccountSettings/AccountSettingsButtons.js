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
    icon: iconMap.Sliders,
    title: 'Dietary Preferences',
    path: '/account/allergens',
  },
  {
    icon: iconMap.CreditCard,
    title: 'Credit Cards',
    path: '/account/credit-cards',
  },
  {
    icon: iconMap.MapPin,
    title: 'Addresses',
    path: '/account/addresses',
  },
  {
    icon: iconMap.Home,
    title: 'House Accounts',
    path: '/account/house-accounts',
  },
  {
    icon: iconMap.User,
    title: 'Profile & Preferences',
    path: '/account/profile',
  },
]

const AccountSettingsButtons = () => {
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

AccountSettingsButtons.displayName = 'AccountSettingsButtons'
export default AccountSettingsButtons
