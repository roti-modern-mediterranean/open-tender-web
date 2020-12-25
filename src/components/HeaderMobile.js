import React, { useEffect, useRef, useState } from 'react'
import propTypes from 'prop-types'
import styled from '@emotion/styled'

const HeaderMobileView = styled('nav')`
  position: fixed;
  z-index: 10;
  top: 0;
  right: 0;
  width: 100%;
  max-width: ${(props) => props.maxWidth};
  height: 6rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${(props) => props.theme.bgColors[props.bgColor]};
  box-shadow: ${(props) =>
    props.stuck ? `0 1rem 1rem 1rem rgba(0, 0, 0, 0.3)` : 'none'};
  padding: 0 1.3rem;
  border-width: 0.1rem;
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

  span {
    display: block;
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
`

const HeaderMobile = ({
  left,
  title,
  right,
  bgColor = 'primary',
  borderColor = 'secondary',
  maxWidth = '100%',
}) => {
  const header = useRef(null)
  const [stuck, setStuck] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (header.current) {
        setStuck(header.current.getBoundingClientRect().top < 0)
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', () => handleScroll)
    }
  }, [])

  return (
    <div ref={header}>
      <HeaderMobileView
        stuck={stuck}
        bgColor={bgColor}
        borderColor={borderColor}
        maxWidth={maxWidth}
      >
        <HeaderMobileNav>{left}</HeaderMobileNav>
        {title && (
          <HeaderMobileTitle>
            <span>{title}</span>
          </HeaderMobileTitle>
        )}
        <HeaderMobileNav>{right}</HeaderMobileNav>
      </HeaderMobileView>
    </div>
  )
}

HeaderMobile.displayName = 'HeaderMobile'
HeaderMobile.propTypes = {
  left: propTypes.element,
  title: propTypes.string,
  right: propTypes.element,
  bgColor: propTypes.string,
  borderColor: propTypes.string,
  maxWidth: propTypes.string,
}

export default HeaderMobile
