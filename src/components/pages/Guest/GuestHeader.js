import React from 'react'
import propTypes from 'prop-types'
import styled from '@emotion/styled'
import GuestActions from './GuestActions'

const GuestHeaderView = styled('div')`
  padding: 2.5rem;
  flex: 0 0 auto;
  opacity: 0;
  animation: slide-up 0.25s ease-in-out 0.125s forwards;
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    text-align: center;
    padding: 2rem;
  }

  h1 {
    line-height: 1;
    @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
      font-size: ${(props) => props.theme.fonts.sizes.h3};
    }
  }

  p {
    line-height: ${(props) => props.theme.lineHeight};
    margin: 1rem 0 0;
    @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
      margin: 0.5rem 0 0;
      font-size: ${(props) => props.theme.fonts.sizes.small};
    }
  }
`

const GuestHeader = ({ title, subtitle, footnote, children }) => {
  return (
    <GuestHeaderView>
      {title && <h1>{title}</h1>}
      {subtitle && <p>{subtitle}</p>}
      <div>
        <GuestActions />
      </div>
      {footnote && <p>{footnote}</p>}
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
