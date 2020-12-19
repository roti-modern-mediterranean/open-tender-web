import React from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { selectCustomer, logoutCustomer } from '@open-tender/redux'
import styled from '@emotion/styled'

import { openModal, selectNav, toggleNav } from '../../slices'
import { Button, Heading } from '..'
import NavOverlay from './NavOverlay'
import NavClose from './NavClose'

const navCustomer = [
  {
    title: 'Order History',
    path: '/orders',
  },
  {
    title: 'Favorites',
    path: '/favorites',
  },
  {
    title: 'Rewards',
    path: '/rewards',
  },
  {
    title: 'Gift Cards',
    path: '/gift-cards',
  },
  {
    title: 'Allergens',
    path: '/allergens',
  },
  {
    title: 'Addresses',
    path: '/addresses',
  },
  {
    title: 'Credit Cards',
    path: '/credit-cards',
  },
  {
    title: 'House Accounts',
    path: '/house-accounts',
  },
  {
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
  // justify-content: space-between;
  // align-items: center;
  // text-align: left;
`

const NavHeader = styled('div')`
  width: 100%;
  padding: 4rem 1rem 2rem 3.5rem;

  button span {
    font-size: ${(props) => props.theme.fonts.sizes.h3};
  }
`

const NavItems = styled('nav')`
  width: 100%;
  padding: 0 0 2rem;
`

const NavItem = styled('div')`
  width: 100%;

  button {
    width: 100%;
    text-align: left;
    justify-content: flex-start;
    padding: 1.2rem 1rem 1.2rem 3.5rem;
  }

  button span {
    font-size: ${(props) => props.theme.fonts.sizes.h4};
  }
`

const NavFooter = styled('div')`
  width: 100%;
  padding: 0 0 2rem;

  button {
    width: 100%;
    text-align: left;
    justify-content: flex-start;
    padding: 0 1rem 0 3.5rem;
  }

  button span {
    font-size: ${(props) => props.theme.fonts.sizes.h4};
  }
`

const Nav = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const { isOpen } = useSelector(selectNav)
  const { profile } = useSelector(selectCustomer)
  // const { first_name, last_name } = profile || {}

  const closeGo = (path) => {
    dispatch(toggleNav())
    history.push(path)
  }

  const login = () => {
    dispatch(toggleNav())
    dispatch(openModal({ type: 'login' }))
  }

  const logout = () => {
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
              <Button onClick={() => closeGo('/account')}>
                <Heading>
                  Account
                  {/* {first_name} {last_name} */}
                </Heading>
              </Button>
            )}
          </NavHeader>
          <NavItems>
            {profile ? (
              navCustomer.map((i) => (
                <NavItem key={i.path}>
                  <Button onClick={() => closeGo(i.path)}>
                    <Heading>{i.title}</Heading>
                  </Button>
                </NavItem>
              ))
            ) : (
              <>
                <NavItem>
                  <Button onClick={login}>
                    <Heading>Login</Heading>
                  </Button>
                </NavItem>
                <NavItem>
                  <Button onClick={() => closeGo('/signup')}>
                    <Heading>Sign Up</Heading>
                  </Button>
                </NavItem>
              </>
            )}
          </NavItems>
          {profile && (
            <NavFooter>
              <Button onClick={logout}>
                <Heading>Logout</Heading>
              </Button>
            </NavFooter>
          )}
        </NavContainer>
      </NavView>
    </>
  )
}

Nav.displayName = 'Nav'

export default Nav
