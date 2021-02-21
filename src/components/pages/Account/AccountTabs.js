import styled from '@emotion/styled'
import React from 'react'
import { isMobile } from 'react-device-detect'
import { useSelector } from 'react-redux'
import { useHistory, useLocation } from 'react-router-dom'
import { ButtonStyled } from '@open-tender/components'
// import { selectCustomerGroupOrders } from '@open-tender/redux'

import { selectBrand, selectSettings, selectTheme } from '../../../slices'
import iconMap from '../../iconMap'
import AccountTab from './AccountTab'

const AccountTabsView = styled('div')`
  position: fixed;
  z-index: 14;
  bottom: 0;
  right: 0;
  width: 100%;
  max-width: ${(props) => props.maxWidth};
  height: 6rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  // background-color: rgba(0, 0, 0, 0.3);
  // border-top: 0.1rem solid rgba(255, 255, 255, 0.3);
  background-color: ${(props) => props.theme.bgColors.primary};
  border-top: 0.1rem solid ${(props) => props.theme.border.color};
`

const navTabs = [
  {
    icon: iconMap.Clock,
    title: 'Orders',
    path: '/orders',
  },
  {
    icon: iconMap.Heart,
    title: 'Favorites',
    path: '/favorites',
  },
  {
    icon: iconMap.Award,
    title: 'Rewards',
    path: '/rewards',
  },
  {
    icon: iconMap.Gift,
    title: 'Gift Cards',
    path: '/account/gift-cards',
  },
  {
    icon: iconMap.User,
    title: 'Account',
    path: '/account',
  },
]

const AccountTabs = () => {
  const history = useHistory()
  const { pathname } = useLocation()
  const theme = useSelector(selectTheme)
  const { has_rewards, has_thanx } = useSelector(selectBrand)
  const { accountSections } = useSelector(selectSettings)
  const hasLevelUp = accountSections.filter((i) => i === 'levelup').length > 0
  const hasRewards = has_rewards || has_thanx || hasLevelUp
  // const { entities: groupOrders } = useSelector(selectCustomerGroupOrders)
  let removed = !hasRewards ? ['/rewards'] : []
  // if (!groupOrders.length) removed.push('/group-orders')
  const filteredButtons = navTabs.filter((i) => !removed.includes(i.path))
  const buttons = filteredButtons.map((i) => ({
    ...i,
    onClick: () => history.push(i.path),
  }))
  const delay = 0.125

  return isMobile ? (
    <AccountTabsView>
      {buttons.map((button, index) => (
        <AccountTab
          key={button.title}
          delay={`${((index + 1) * 0.125 + delay).toFixed(3)}s`}
          {...button}
          color={button.path === pathname ? theme.links.primary.color : null}
        />
      ))}
    </AccountTabsView>
  ) : (
    buttons.map((button) => (
      <ButtonStyled
        key={button.title}
        onClick={button.onClick}
        icon={button.icon}
        color="header"
        size="header"
        style={
          button.path === pathname ? { color: theme.links.primary.color } : null
        }
      >
        {button.title}
      </ButtonStyled>
    ))
  )
}

AccountTabs.displayName = 'AccountTabs'
export default AccountTabs
