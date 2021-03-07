import React from 'react'
import { useSelector } from 'react-redux'
import styled from '@emotion/styled'

import { selectConfig } from '../../../slices'
import { PageHeader } from '../..'
import GuestActions from './GuestActions'
import { Link } from 'react-router-dom'

const GuestGreetingView = styled('div')`
  // padding: ${(props) => props.theme.layout.padding} 0;
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    width: 100%;
  }
`

const GuestGreetingFootnote = styled('p')`
  margin: 2rem 0 0;
  font-size: ${(props) => props.theme.fonts.sizes.small};
  opacity: 0;
  animation: slide-up 0.25s ease-in-out 0.125s forwards;
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    margin: 2rem 0 0;
    text-align: center;
  }
`

const GuestGreetingLinks = styled('p')`
  opacity: 0;
  animation: slide-up 0.25s ease-in-out 0.125s forwards;
  margin: 2.5rem 0 0;
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    margin: 1.5rem 0 0;
    font-size: ${(props) => props.theme.fonts.sizes.small};
    text-align: center;
  }
`

const GuestGreeting = () => {
  const { home } = useSelector(selectConfig)
  const { title, subtitle } = home
  const footnote = "Hint: you don't need an account to place an order."

  return (
    <GuestGreetingView>
      <PageHeader title={title} subtitle={subtitle} />
      <GuestActions />
      {footnote && <GuestGreetingFootnote>{footnote}</GuestGreetingFootnote>}
      {/* <GuestGreetingLinks>
        <Link to="/gift-cards">Purchase gift cards</Link> |{' '}
        <Link to="/donations">make a donation</Link> |{' '}
        <Link to="/contact">get in touch</Link>
      </GuestGreetingLinks> */}
    </GuestGreetingView>
  )
}

GuestGreeting.displayName = 'GuestGreeting'

export default GuestGreeting
