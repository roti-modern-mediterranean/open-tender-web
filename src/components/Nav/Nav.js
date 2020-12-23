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
    path: '/gift-cards',
  },
  {
    icon: iconMap.Sliders,
    title: 'Allergens',
    path: '/allergens',
  },
  {
    icon: iconMap.MapPin,
    title: 'Addresses',
    path: '/addresses',
  },
  {
    icon: iconMap.CreditCard,
    title: 'Credit Cards',
    path: '/credit-cards',
  },
  {
    icon: iconMap.Home,
    title: 'House Accounts',
    path: '/house-accounts',
  },
  {
    icon: iconMap.Settings,
    title: 'Profile & Preferences',
    path: '/profile',
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

const NavButton = styled('button')`
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
                {/* <Button onClick={() => closeGo('/account')}>
                  <Heading>Account</Heading>
                </Button> */}
                <NavButton onClick={(evt) => closeGo(evt, '/account')}>
                  <NavIcon>{iconMap.User}</NavIcon>
                  <NavTitle>Account</NavTitle>
                </NavButton>
              </>
            )}
          </NavHeader>
          <NavItems>
            {profile ? (
              filteredButtons.map((i) => (
                <NavButton key={i.path} onClick={(evt) => closeGo(evt, i.path)}>
                  <NavIcon>{i.icon}</NavIcon>
                  <NavTitle>{i.title}</NavTitle>
                </NavButton>
              ))
            ) : (
              <>
                <NavButton onClick={login}>
                  <NavIcon>{iconMap.User}</NavIcon>
                  <NavTitle>Login</NavTitle>
                </NavButton>
                <NavButton onClick={(evt) => closeGo(evt, '/signup')}>
                  <NavIcon>{iconMap.PlusCircle}</NavIcon>
                  <NavTitle>Sign Up</NavTitle>
                </NavButton>
              </>
            )}
          </NavItems>
          {profile && (
            <NavFooter>
              <NavButton onClick={logout}>
                <NavIcon>{iconMap.LogOut}</NavIcon>
                <NavTitle>Logout</NavTitle>
              </NavButton>
            </NavFooter>
          )}
        </NavContainer>
      </NavView>
    </>
  )
}

Nav.displayName = 'Nav'

export default Nav
