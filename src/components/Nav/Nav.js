import React from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { selectCustomer, logoutCustomer } from '@open-tender/redux'
import styled from '@emotion/styled'

import { openModal, selectBrand, selectNav, toggleNav } from '../../slices'
import { Heading } from '..'
import NavOverlay from './NavOverlay'
import NavClose from './NavClose'
import iconMap from '../iconMap'

const navButtons = [
  {
    icon: iconMap.ShoppingBag,
    title: 'Order History',
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
    icon: iconMap.Sliders,
    title: 'Allergens',
    path: '/account/allergens',
  },
  {
    icon: iconMap.MapPin,
    title: 'Addresses',
    path: '/account/addresses',
  },
  {
    icon: iconMap.CreditCard,
    title: 'Credit Cards',
    path: '/account/credit-cards',
  },
  {
    icon: iconMap.Home,
    title: 'House Accounts',
    path: '/account/house-accounts',
  },
  {
    icon: iconMap.Settings,
    title: 'Profile & Preferences',
    path: '/account/profile',
  },
]

const NavView = styled('aside')`
  position: fixed;
  z-index: 17;
  top: 0;
  bottom: 0;
  right: 0;
  width: 28rem;
  max-width: 100%;
  transition: all 0.25s ease;
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;
  background-color: ${(props) => props.theme.bgColors.primary};
  transform: translateX(${(props) => (props.isOpen ? '0' : '100%')});
`

const NavContainer = styled('div')`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`

const NavHeader = styled('div')`
  width: 100%;
  padding: 2.5rem 0 1rem;

  button span {
    font-size: ${(props) => props.theme.fonts.sizes.h3};
  }
`

const NavItems = styled('nav')`
  width: 100%;
  padding: 0 0 2rem;
`

const NavItem = styled('button')`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  text-align: left;
  line-height: 1;
  padding: 1.2rem 1rem 1.2rem 3.5rem;
  color: ${(props) => props.theme.fonts.headings.color};

  span {
    font-size: ${(props) => props.theme.fonts.sizes.big};
  }
`

const NavIcon = styled('span')`
  display: block;
  line-height: 0;
  position: relative;
  top: -0.1rem;
  width: 1.6rem;
  height: 1.6rem;
  margin: 0 1.7rem 0 0;
`

const NavTitle = styled(Heading)`
  flex-grow: 1;
  font-size: ${(props) => props.theme.fonts.sizes.big};
`

const NavFooter = styled('div')`
  width: 100%;
  padding: 0 0 2rem;
`

const Nav = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const { isOpen } = useSelector(selectNav)
  const { profile } = useSelector(selectCustomer)
  const { has_rewards, has_thanx } = useSelector(selectBrand)
  const filteredButtons =
    has_rewards || has_thanx
      ? navButtons
      : navButtons.filter((i) => i.path !== '/rewards')

  const closeGo = (evt, path) => {
    evt.target.blur()
    evt.preventDefault()
    evt.stopPropagation()
    dispatch(toggleNav())
    history.push(path)
  }

  const login = (evt) => {
    evt.target.blur()
    evt.preventDefault()
    evt.stopPropagation()
    dispatch(toggleNav())
    dispatch(openModal({ type: 'login' }))
  }

  const logout = (evt) => {
    evt.target.blur()
    evt.preventDefault()
    evt.stopPropagation()
    dispatch(toggleNav())
    dispatch(logoutCustomer())
  }

  return (
    <>
      <NavOverlay />
      <NavView isOpen={isOpen}>
        <NavContainer>
          {isOpen && <NavClose />}
          <NavHeader>
            {profile && (
              <>
                <NavItem onClick={(evt) => closeGo(evt, '/account')}>
                  <NavIcon>{iconMap.User}</NavIcon>
                  <NavTitle>Account</NavTitle>
                </NavItem>
              </>
            )}
          </NavHeader>
          <NavItems>
            {profile ? (
              filteredButtons.map((i) => (
                <NavItem key={i.path} onClick={(evt) => closeGo(evt, i.path)}>
                  <NavIcon>{i.icon}</NavIcon>
                  <NavTitle>{i.title}</NavTitle>
                </NavItem>
              ))
            ) : (
              <>
                <NavItem onClick={login}>
                  <NavIcon>{iconMap.User}</NavIcon>
                  <NavTitle>Login</NavTitle>
                </NavItem>
                <NavItem onClick={(evt) => closeGo(evt, '/signup')}>
                  <NavIcon>{iconMap.PlusCircle}</NavIcon>
                  <NavTitle>Sign Up</NavTitle>
                </NavItem>
              </>
            )}
          </NavItems>
          {profile && (
            <NavFooter>
              <NavItem onClick={logout}>
                <NavIcon>{iconMap.LogOut}</NavIcon>
                <NavTitle>Logout</NavTitle>
              </NavItem>
            </NavFooter>
          )}
        </NavContainer>
      </NavView>
    </>
  )
}

Nav.displayName = 'Nav'

export default Nav
