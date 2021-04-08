import React, { useContext, useEffect, useRef, useState } from 'react'
import propTypes from 'prop-types'
import { isMobile } from 'react-device-detect'
import styled from '@emotion/styled'

import { AppContext } from '../App'

const HeaderCheckoutView = styled('div')`
  position: fixed;
  z-index: 14;
  top: 0;
  left;
  max-width: ${(props) => props.maxWidth};
  height: 7.6rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: all 0.25s ease;
  background-color: transparent;
  padding: ${(props) => (props.isMobile ? '0' : props.theme.layout.padding)};
  background: ${(props) =>
    props.stuck
      ? 'radial-gradient(circle, rgba(212,219,228,1) 0%, rgba(212,219,228,0.5) 50%, transparent 100%);'
      : 'none'};
  @media (max-width: ${(props) => props.theme.breakpoints.narrow}) {
    padding: ${(props) => props.theme.layout.paddingMobile};
    height: 6.4rem;
  }
`

const HeaderNav = styled('div')`
  position: relative;
  z-index: 2;
  display: flex;
  align-items: center;

  ${(props) =>
    props.isBrowser
      ? `
    button {
    margin: 0 0 0 ${props.theme.layout.padding};

    &:first-of-type {
      margin: 0
    }
    }
  `
      : `display: flex; align-items: center;`}
`

const HeaderCheckout = ({ left, style = null }) => {
  const header = useRef(null)
  const [stuck, setStuck] = useState(false)
  const { windowRef } = useContext(AppContext)

  useEffect(() => {
    const winRef = windowRef.current
    const handleScroll = () => {
      if (header.current) {
        setStuck(header.current.getBoundingClientRect().top < 0)
      }
    }
    winRef.addEventListener('scroll', handleScroll)
    return () => {
      winRef.removeEventListener('scroll', () => handleScroll)
    }
  }, [windowRef])

  return left ? (
    <nav ref={header} role="navigation" aria-label="Primary Navigation">
      <HeaderCheckoutView stuck={stuck} isMobile={isMobile} style={style}>
        <HeaderNav>{left}</HeaderNav>
      </HeaderCheckoutView>
    </nav>
  ) : null
}

HeaderCheckout.displayName = 'HeaderCheckout'
HeaderCheckout.propTypes = {
  left: propTypes.element,
}

export default HeaderCheckout
