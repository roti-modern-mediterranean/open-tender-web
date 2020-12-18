import React from 'react'
import styled from '@emotion/styled'

const HeaderDesktopContainer = styled('nav')`
  position: fixed;
  z-index: 10;
  top: 0;
  right: 0;
  width: 100%;
  max-width: ${(props) => props.maxWidth};
  height: 6rem;
  background-color: ${(props) => props.bgColor || props.theme.bgColors.primary};
  // background-color: rgba(0, 0, 0, 0.3);
  // box-shadow: 0 1rem 1rem 1rem rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 1.3rem;
`

const HeaderDesktopNav = styled('div')`
  position: relative;
  z-index: 2;
`

const HeaderDesktop = ({
  left,
  title,
  right,
  color,
  bgColor,
  maxWidth = '100%',
}) => {
  return (
    <HeaderDesktopContainer bgColor={bgColor} maxWidth={maxWidth}>
      <HeaderDesktopNav>{left}</HeaderDesktopNav>
      <HeaderDesktopNav>{right}</HeaderDesktopNav>
    </HeaderDesktopContainer>
  )
}

HeaderDesktop.displayName = 'HeaderDesktop'

export default HeaderDesktop
