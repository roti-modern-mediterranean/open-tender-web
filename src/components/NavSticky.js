import React, { useState, useRef, useEffect, useContext } from 'react'
import propTypes from 'prop-types'
import { useSelector } from 'react-redux'
import styled from '@emotion/styled'
import { getWidth } from '@open-tender/js'

import { selectTheme } from '../slices'
import { AppContext } from '../App'
import { NavScroll } from '.'

const NavStickyView = styled('div')`
  width: 100%;
  height: ${(props) => props.navHeight};
`

const NavStickyInner = styled('div')`
  width: 100%;
  background: linear-gradient(
    0deg,
    rgba(212, 219, 228, 0) 0%,
    rgb(212, 219, 228, 0.75) 25%,
    rgb(212, 219, 228) 100%
  );
  ${(props) =>
    props.stuck &&
    `position: fixed;
      z-index: 10;
      top: ${props.navTopOffset};
      left: 0;
      right: 0;`}
`

const NavSticky = ({ items, scrollOffset = 0, height = 90 }) => {
  const [stuck, setStuck] = useState(false)
  const [topOffset, setTopOffset] = useState(76)
  const stickyRef = useRef(null)
  const theme = useSelector(selectTheme)
  const tabletWidth = parseInt(theme.breakpoints.tablet.replace('px', ''))
  const { windowRef } = useContext(AppContext)
  const navHeight = `${(parseFloat(height) / 10.0).toFixed(2)}rem`
  const navTopOffset = `${(parseFloat(topOffset) / 10.0).toFixed(2)}rem`

  useEffect(() => {
    const width = getWidth()
    const topOffset =
      width && tabletWidth ? (width > tabletWidth ? 76 : 64) : 76
    setTopOffset(topOffset)
  }, [tabletWidth])

  useEffect(() => {
    const winRef = windowRef.current
    const handleScroll = () => {
      if (stickyRef.current) {
        setStuck(stickyRef.current.getBoundingClientRect().top <= topOffset)
      }
    }
    winRef.addEventListener('scroll', handleScroll)
    return () => {
      winRef.removeEventListener('scroll', () => handleScroll)
    }
  }, [windowRef, topOffset])

  return (
    <NavStickyView ref={stickyRef} navHeight={navHeight}>
      <NavStickyInner stuck={stuck} navTopOffset={navTopOffset}>
        <NavScroll
          items={items}
          scrollOffset={scrollOffset}
          navHeight={navHeight}
          topOffset={height + topOffset}
        />
      </NavStickyInner>
    </NavStickyView>
  )
}

NavSticky.displayName = 'NavSticky'
NavSticky.propTypes = {
  items: propTypes.array,
  offset: propTypes.number,
}

export default NavSticky
