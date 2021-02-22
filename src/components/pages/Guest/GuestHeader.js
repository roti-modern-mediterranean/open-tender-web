import React from 'react'
import propTypes from 'prop-types'
import { Link } from 'react-router-dom'
import styled from '@emotion/styled'

import GuestActions from './GuestActions'
import { selectConfig } from '../../../slices'
import { useSelector } from 'react-redux'
import { Container, PageHeader } from '../..'

const GuestHeaderView = styled('div')`
  flex: 0 0 auto;
  margin: 0 0 2.5rem;
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    text-align: center;
    margin: 0 0 2rem;
  }
`

const GuestHeaderFootnote = styled('p')`
  font-size: ${(props) => props.theme.fonts.sizes.small};
  opacity: 0;
  animation: slide-up 0.25s ease-in-out 0.125s forwards;
`

const GuestHeaderLinks = styled('p')`
  opacity: 0;
  animation: slide-up 0.25s ease-in-out 0.125s forwards;
  margin: 3rem 0 0;
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    margin: 1.5rem 0 0;
    font-size: ${(props) => props.theme.fonts.sizes.small};
  }
`

const GuestHeader = () => {
  const { home } = useSelector(selectConfig)
  const { title, subtitle } = home
  const footnote = "Hint: you don't need an account to place an order."

  return (
    <GuestHeaderView>
      <PageHeader title={title} subtitle={subtitle} />
      <Container>
        <GuestActions />
        {footnote && <GuestHeaderFootnote>{footnote}</GuestHeaderFootnote>}
        <GuestHeaderLinks>
          <Link to="/gift-cards">Purchase gift cards</Link> |{' '}
          <Link to="/donations">make a donation</Link> |{' '}
          <Link to="/contact">get in touch</Link>
        </GuestHeaderLinks>
      </Container>
    </GuestHeaderView>
  )
}

GuestHeader.displayName = 'GuestHeader'
GuestHeader.propTypes = {
  title: propTypes.string,
  subtitle: propTypes.string,
  children: propTypes.oneOfType([
    propTypes.arrayOf(propTypes.node),
    propTypes.node,
  ]),
}

export default GuestHeader
