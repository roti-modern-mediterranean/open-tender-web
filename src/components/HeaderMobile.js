import React, { useContext, useEffect, useRef, useState } from 'react'
import propTypes from 'prop-types'
import styled from '@emotion/styled'
import { AppContext } from '../App'
import { isBrowser } from 'react-device-detect'

const HeaderMobileView = styled('div')`
  position: fixed;
  z-index: 14;
  top: 0;
  right: 0;
  width: 100%;
  max-width: ${(props) => props.maxWidth};
  height: 6rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: all 0.25s ease;
  background-color: ${(props) => props.theme.bgColors[props.bgColor]};
  box-shadow: ${(props) =>
    props.stuck ? props.theme.boxShadow.outer : 'none'};
  padding: 0 1.7rem;
  border: 0;
  border-bottom-width: 0.1rem;
  border-style: solid;
  border-color: ${(props) => props.theme.bgColors[props.borderColor]};

  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    padding: 0;
  }
`

const HeaderMobileTitle = styled('div')`
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

  > span {
    display: block;
    max-width: 26rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-family: ${(props) => props.theme.fonts.headings.family};
    font-weight: ${(props) => props.theme.fonts.headings.weight};
    letter-spacing: ${(props) => props.theme.fonts.headings.letterSpacing};
    text-transform: ${(props) => props.theme.fonts.headings.textTransform};
    -webkit-font-smoothing: ${(props) =>
      props.theme.fonts.headings.fontSmoothing};
    color: ${(props) => props.theme.fonts.headings.color};
    font-size: ${(props) => props.theme.fonts.sizes.xBig};
  }
`

const HeaderMobileNav = styled('div')`
  position: relative;
  z-index: 2;

  ${(props) =>
    props.isBrowser
      ? `
    button {
    margin: 0 0 0 1rem;

    &:first-of-type {
      margin: 0
    }
    }
  `
      : `display: flex; align-items: center;`}
`

const HeaderMobile = ({
  left,
  title,
  right,
  bgColor = 'primary',
  borderColor = 'primary',
  maxWidth = '100%',
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
      <HeaderMobileView
        stuck={stuck}
        bgColor={bgColor}
        borderColor={adjustedBorderColor}
        maxWidth={maxWidth}
      >
        <HeaderMobileNav>{left}</HeaderMobileNav>
        {title && (
          <HeaderMobileTitle>
            <span>{title}</span>
          </HeaderMobileTitle>
        )}
        <HeaderMobileNav isBrowser={isBrowser}>{right}</HeaderMobileNav>
      </HeaderMobileView>
    </nav>
  )
}

HeaderMobile.displayName = 'HeaderMobile'
HeaderMobile.propTypes = {
  left: propTypes.element,
  title: propTypes.oneOfType([propTypes.string, propTypes.element]),
  right: propTypes.element,
  bgColor: propTypes.string,
  borderColor: propTypes.string,
  maxWidth: propTypes.string,
}

export default HeaderMobile
