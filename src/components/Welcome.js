import React from 'react'
import propTypes from 'prop-types'
import styled from '@emotion/styled'

const WelcomeGreeting = styled('div')`
  width: 100%;
  flex: 1 0 100%;
  padding: 3rem 2.5rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-start;
`

const WelcomeHeader = styled('div')`
  margin: 0 0 2rem;

  p {
    color: ${(props) => props.theme.fonts.headings.color};
    margin: 0.5rem 0 0;
  }
`

const WelcomeContent = styled('div')`
  margin: 0;
`

const WelcomeButtons = styled('div')`
  width: 100%;
  flex: 0 0 auto;
`

const Welcome = ({ header, content, children }) => {
  return (
    <>
      <WelcomeGreeting>
        {header && <WelcomeHeader>{header}</WelcomeHeader>}
        {content && <WelcomeContent>{content}</WelcomeContent>}
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
