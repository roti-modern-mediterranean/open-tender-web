import React from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { selectCustomer, logoutCustomer } from '@open-tender/redux'
import { Heading, Preface } from '@open-tender/components'
import styled from '@emotion/styled'

import { openModal, selectBrand, toggleNav, toggleSidebar } from '../../slices'
import NavClose from './NavClose'

const guestLinks = [
  {
    title: 'Account',
    links: [
      {
        title: 'Home',
        path: '/',
      },
      {
        title: 'Register',
        path: '/signup',
      },
      {
        title: 'Login',
        button: 'login',
      },
      {
        title: 'Gift Cards',
        path: '/gift-cards',
      },
    ],
  },
  {
    title: 'Orders',
    links: [
      {
        title: 'Cart',
        button: 'cart',
      },
    ],
  },
  // {
  //   title: 'Food Preferences',
  //   links: [
  //     {
  //       title: 'Dietary Preferences',
  //       path: '/nutrition',
  //     },
  //   ],
  // },
  {
    title: 'Other',
    links: [
      {
        title: 'Locations',
        path: '/locations',
      },
      {
        title: 'About',
        path: '/about',
      },
      {
        title: 'Careers',
        path: '/careers',
      },
      {
        title: 'Terms',
        path: '/terms',
      },
    ],
  },
]

const userLinks = [
  {
    title: 'Account',
    links: [
      {
        title: 'Home',
        path: '/',
      },
      {
        title: 'Profile',
        path: '/profile',
      },
      {
        title: 'Addresses',
        path: '/addresses',
      },
      {
        title: 'Payment',
        path: '/payment',
      },
      {
        title: 'Gift Cards',
        path: '/account-gift-cards',
      },
    ],
  },
  {
    title: 'Orders',
    links: [
      {
        title: 'Recent Orders',
        path: '/orders',
      },
      {
        title: 'Cart',
        button: 'cart',
      },
    ],
  },
  {
    title: 'Food Preferences',
    links: [
      {
        title: 'Favorites',
        path: '/favorites',
      },
      {
        title: 'Dietary Preferences',
        path: '/nutrition',
      },
    ],
  },
  {
    title: 'Other',
    links: [
      {
        title: 'Locations',
        path: '/locations',
      },
      {
        title: 'About',
        path: '/about',
      },
      {
        title: 'Careers',
        path: '/careers',
      },
      {
        title: 'Terms',
        path: '/terms',
      },
    ],
  },
]

const NavView = styled('nav')`
  position: fixed;
  z-index: 101;
  top: 0;
  bottom: 0;
  left: 0;
  width: 48rem;
  max-width: 100%;
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;
  background-color: ${(props) => props.theme.bgColors.dark};
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    width: 30rem;
  }
`

const NavContainer = styled('div')`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`

const NavItems = styled('nav')`
  width: 100%;
  padding: 9rem 3rem;
`

const NavSection = styled('div')`
  margin: 0 0 2rem;
`

const NavSectionTitle = styled('div')`
  margin: 0 0 0.5rem;
`

const NavItem = styled('button')`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  text-align: left;
  padding: 0.5rem 0;
  // margin: 0.25rem 0 0;
  font-weight: normal;
  color: ${(props) => props.theme.links.primary.color};

  p span {
    color: ${(props) => props.theme.links.primary.color};
    font-weight: normal;
    text-transform: none;
    font-size: 2.2rem;
  }
`

const NavTitle = styled('p')`
  // flex-grow: 1;
  // font-size: ${(props) => props.theme.fonts.sizes.main};
  // line-height: 1.2;
`

const NavFooter = styled('div')`
  position: relative;
  width: 100%;
  padding: 2rem 0 0;

  & > div:first-of-type {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 0.1rem;
    // border-top: 0.1rem solid ${(props) => props.theme.colors.primary};
    background-color: ${(props) => props.theme.colors.primary};
    opacity: 0.15;
  }

  button p span {
    text-transform: uppercase;
  }
`

const Nav = React.forwardRef((props, ref) => {
  const dispatch = useDispatch()
  const history = useHistory()
  const { profile } = useSelector(selectCustomer)
  const brand = useSelector(selectBrand)
  const { has_rewards, has_thanx, has_levelup, has_deals } = brand
  const hasRewards = has_rewards || has_thanx || has_levelup
  let removed = []
  if (!hasRewards) removed.push('/rewards')
  if (!has_deals) removed.push('/deals')
  const links = profile ? userLinks : guestLinks
  const filteredLinks = links.map((s) => ({
    ...s,
    links: s.links.filter((i) => !removed.includes(i.path)),
  }))

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

  const cart = (evt) => {
    evt.target.blur()
    evt.preventDefault()
    evt.stopPropagation()
    dispatch(toggleNav())
    dispatch(toggleSidebar())
  }

  const buttons = {
    login: login,
    cart: cart,
  }

  return (
    <NavView ref={ref}>
      <NavContainer>
        <NavClose />
        <NavItems>
          {filteredLinks.map((section) => (
            <NavSection>
              <NavSectionTitle>
                <Heading size="h6">{section.title}</Heading>
              </NavSectionTitle>
              {section.links.map((i) => (
                <NavItem
                  key={i.path}
                  onClick={(evt) =>
                    i.path ? closeGo(evt, i.path) : buttons[i.button](evt)
                  }
                >
                  <NavTitle>
                    <Preface>{i.title}</Preface>
                  </NavTitle>
                </NavItem>
              ))}
            </NavSection>
          ))}
          <NavFooter>
            <div />
            {profile ? (
              <NavItem onClick={logout}>
                <NavTitle>
                  <Preface>Sign Out</Preface>
                </NavTitle>
              </NavItem>
            ) : (
              <NavItem onClick={login}>
                <NavTitle>
                  <Preface>Login</Preface>
                </NavTitle>
              </NavItem>
            )}
          </NavFooter>
        </NavItems>
      </NavContainer>
    </NavView>
  )
})

Nav.displayName = 'Nav'

export default Nav
