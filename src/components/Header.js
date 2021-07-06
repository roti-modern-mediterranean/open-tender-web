import React, { useContext, useEffect, useRef, useState } from 'react'
import propTypes from 'prop-types'
import styled from '@emotion/styled'
import { Preface } from '@open-tender/components'

import { AppContext } from '../App'
import { isBrowser, isMobile } from 'react-device-detect'

//TODO add to configSlice
const headerBorderBottomWidth = "0.1rem"

const HeaderView = styled('div')`
  label: HeaderView;
  
  position: fixed;
  z-index: 14;
  top: 0;
  right: 0;
  width: 100%;
  max-width: ${(props) => props.maxWidth};
  height: ${(props) => props.theme.layout.navHeight};
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: all 0.25s ease;
  background-color: ${(props) => props.theme.bgColors[props.bgColor]};
  box-shadow: ${(props) =>
    props.stuck ? props.theme.boxShadow.outer : 'none'};
  border: 0;
  border-bottom-width: ${headerBorderBottomWidth};
  border-style: solid;
  border-color: ${(props) => props.theme.bgColors[props.borderColor]};
  padding: ${(props) => (props.isMobile ? '0' : props.theme.layout.padding)};
  @media (max-width: ${(props) => props.theme.breakpoints.narrow}) {
    padding: ${(props) => {
      const normal = props.theme.layout.paddingMobile
      const bottom = props.theme.border.radiusLarge
      return `${normal} ${normal} ${bottom}`
    }} ;
    border-radius: 0 0 0 ${(props) => props.theme.border.radiusLarge};
    height: auto;
    
    &::after {
      content: "";
      position: absolute;

      background-color: transparent;
      bottom: calc(-2 * ${(props) => props.theme.border.radiusLarge} - ${headerBorderBottomWidth});
      right: 0;
      height: calc(2 * ${(props) => props.theme.border.radiusLarge});
      width: ${(props) => props.theme.border.radiusLarge};
      border-top-right-radius: ${(props) => props.theme.border.radiusLarge};
      box-shadow: 0 -${(props) => props.theme.border.radiusLarge} 0 0 ${(props) => props.theme.bgColors[props.bgColor]};
      pointer-events: none;
    }
  }
`

const HeaderTitle = styled('div')`
  label: HeaderTitle;

  position: absolute;
  z-index: 1;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  
  @media (max-width: ${(props) => props.theme.breakpoints.narrow}){
    margin-bottom: ${(props) => {
      const normal = props.theme.layout.paddingMobile
      const bottom = props.theme.border.radiusLarge
      return `calc(${bottom} - ${normal})`
    }};
  }

  > span {
    display: block;
    font-weight: 500;
    letter-spacing: 0.01em;
    font-size: 2.8rem;
    @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
      max-width: 26rem;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
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

const Header = ({
  left,
  title,
  right,
  bgColor = 'primary',
  borderColor = 'primary',
  maxWidth = '100%',
  style = null,
}) => {
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

  const adjustedBorderColor =
    borderColor === 'primary' && stuck ? 'secondary' : borderColor

  return (
    <nav ref={header} role="navigation" aria-label="Primary Navigation">
      <HeaderView
        stuck={stuck}
        bgColor={bgColor}
        borderColor={adjustedBorderColor}
        maxWidth={maxWidth}
        isMobile={isMobile}
        style={style}
      >
        <HeaderNav>{left}</HeaderNav>
        {title && (
          <HeaderTitle>
            <Preface>{title}</Preface>
          </HeaderTitle>
        )}
        <HeaderNav isBrowser={isBrowser}>{right}</HeaderNav>
      </HeaderView>
    </nav>
  )
}

Header.displayName = 'Header'
Header.propTypes = {
  left: propTypes.element,
  title: propTypes.oneOfType([propTypes.string, propTypes.element]),
  right: propTypes.element,
  bgColor: propTypes.string,
  borderColor: propTypes.string,
  maxWidth: propTypes.string,
}

export default Header
