import React from 'react'
import propTypes from 'prop-types'
import styled from '@emotion/styled'

const WelcomeContentView = styled('div')`
  // padding: 0 2.5rem;
  opacity: 0;
  animation: slide-up 0.25s ease-in-out 0.125s forwards;
`

const WelcomeHeader = styled('div')`
  h1 {
    line-height: 1;
    @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
      color: ${(props) => props.theme.colors.light};
    }
  }

  p {
    line-height: ${(props) => props.theme.lineHeight};
    margin: 1rem 0 0;
    @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
      color: ${(props) => props.theme.colors.light};
    }
  }
`

const WelcomeActions = styled('div')`
  margin: 2rem 0 0;
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    color: ${(props) => props.theme.colors.light};
  }
`

const WelcomeContent = ({ title, subtitle, children }) => {
  return (
    <WelcomeContentView>
      <WelcomeHeader>
        {title && <h1>{title}</h1>}
        {subtitle && <p>{subtitle}</p>}
      </WelcomeHeader>
      {children && <WelcomeActions>{children}</WelcomeActions>}
    </WelcomeContentView>
  )
}

WelcomeContent.displayName = 'WelcomeContent'
WelcomeContent.propTypes = {
  title: propTypes.string,
  subtitle: propTypes.string,
  children: propTypes.oneOfType([
    propTypes.arrayOf(propTypes.node),
    propTypes.node,
  ]),
}

export default WelcomeContent
