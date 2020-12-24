import React from 'react'
import propTypes from 'prop-types'
import styled from '@emotion/styled'

const WelcomeGreeting = styled('div')`
  position: relative;
  width: 100%;
  flex: 1 0 100%;
  padding: 8.5rem 0 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-start;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    background-image: ${(props) => `url(${props.imageUrl})`};
  }
`

const WelcomeHeader = styled('div')`
  // @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
  //   background-color: rgba(0, 0, 0, 0.15);
  // }

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

const WelcomeContent = styled('div')`
  width: 100%;
  padding: 0 2.5rem 2.5rem;
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    background-color: rgba(0, 0, 0, 0.3);
    box-shadow: 0 -2.5rem 2.5rem 0rem rgba(0, 0, 0, 0.3);
  }
`

const WelcomeContentText = styled('div')`
  opacity: 0;
  animation: slide-up 0.25s ease-in-out 0.125s forwards;
`

const WelcomeActions = styled('div')`
  margin: 2rem 0 0;
`

const WelcomeButtons = styled('div')`
  width: 100%;
  flex: 0 0 auto;
`

const Welcome = ({ imageUrl, header, content, children }) => {
  return (
    <>
      <WelcomeGreeting imageUrl={imageUrl}>
        <WelcomeContent>
          <WelcomeContentText>
            {header && <WelcomeHeader>{header}</WelcomeHeader>}
            {content && <WelcomeActions>{content}</WelcomeActions>}
          </WelcomeContentText>
        </WelcomeContent>
      </WelcomeGreeting>
      <WelcomeButtons>{children}</WelcomeButtons>
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
