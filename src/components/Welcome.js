import React from 'react'
import propTypes from 'prop-types'
import styled from '@emotion/styled'

const WelcomeMain = styled('div')`
  position: relative;
  width: 100%;
  // flex: 1 0 100%;
  padding: 8.5rem 0 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    background-image: ${(props) => `url(${props.imageUrl})`};
    flex: 1 0 100%;
    justify-content: flex-end;
  }

  > div {
    width: 100%;
    @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
      background-color: rgba(0, 0, 0, 0.3);
      box-shadow: 0 -2.5rem 2.5rem 0rem rgba(0, 0, 0, 0.3);
    }
  }
`

const WelcomeFooter = styled('div')`
  width: 100%;
  flex: 0 0 auto;
`

const Welcome = ({ children, footer }) => {
  return (
    <>
      <WelcomeMain>
        <div>{children}</div>
      </WelcomeMain>
      <WelcomeFooter>{footer}</WelcomeFooter>
    </>
  )
}

Welcome.displayName = 'Welcome'
Welcome.propTypes = {
  header: propTypes.node,
  content: propTypes.node,
  children: propTypes.oneOfType([
    propTypes.arrayOf(propTypes.node),
    propTypes.node,
  ]),
}

export default Welcome
