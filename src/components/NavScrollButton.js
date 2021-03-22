import React from 'react'
import propTypes from 'prop-types'
import { animateScroll as scroll } from 'react-scroll'
import styled from '@emotion/styled'
import { slugify } from '@open-tender/js'
import { BgImage } from '@open-tender/components'

const NavScrollButtonView = styled('button')`
  position: relative;
  display: block;
  height: 100%;
  flex: 1;
  padding: 0 3rem 0 4rem;
  margin: 0 0 0 0.5rem;
  text-align: left;
  font-family: ${(props) => props.theme.fonts.headings.family};
  font-weight: 600;
  font-size: 1.4rem;
  line-height: 1;
  text-transform: uppercase;
  border-radius: ${(props) => props.theme.border.radius};
  color: ${(props) => props.theme.colors.primary};
  background-color: ${(props) => props.theme.colors.light};

  // &:hover,
  // &:active,
  // &:focus {
  //   color: ${(props) => props.theme.colors.light};
  //   background-color: ${(props) => props.theme.colors.primary};
  // }

  &:disabled {
    opacity: 1;
    color: ${(props) => props.theme.colors.light};
    background-color: ${(props) => props.theme.colors.primary};
  }
`

const NavScrollButtonImage = styled(BgImage)`
  position: absolute;
  z-index: 1;
  top: -0.6rem;
  bottom: -0.6rem;
  left: -1.5rem;
  width: 5.2rem;
  height: 5.2rem;
  // border-radius: 2.4rem;
  // box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.65);
`

const NavScrollButton = ({ container, item, active = false, offset = -50 }) => {
  const { name, imageUrl } = item
  const id = slugify(name)
  const bgStyle = imageUrl ? { backgroundImage: `url(${imageUrl}` } : null

  const onClick = (evt) => {
    evt.preventDefault()
    evt.target.blur()
    const element = document.getElementById(id)
    const position = element.offsetTop + offset
    scroll.scrollTo(position, {
      container,
      duration: 500,
      smooth: true,
      offset,
    })
    // const items = element.querySelectorAll('button')
    // const firstItem = items.length ? items[0] : null
    // if (firstItem) firstItem.focus()
  }

  return (
    <NavScrollButtonView onClick={onClick} disabled={active}>
      <NavScrollButtonImage style={bgStyle} />
      {name}
    </NavScrollButtonView>
  )
}

NavScrollButton.displayName = 'NavScrollButton'
NavScrollButton.propTypes = {
  container: propTypes.oneOfType([
    propTypes.func,
    propTypes.shape({ current: propTypes.instanceOf(Element) }),
  ]),
  item: propTypes.object,
  active: propTypes.bool,
  offset: propTypes.number,
}

export default NavScrollButton
