import React, { useState, useRef, useEffect, useContext } from 'react'
import propTypes from 'prop-types'
// import throttle from 'lodash/throttle'
import { slugify } from '@open-tender/js'

import { AppContext } from '../App'
import styled from '@emotion/styled'

const getActiveElement = (elements, topOffset) => {
  return elements
    .filter((i) => i.getBoundingClientRect().top <= topOffset)
    .reduce(
      (max, i) =>
        max && max.getBoundingClientRect().top > i.getBoundingClientRect().top
          ? max
          : i,
      null
    )
}

const NavScrollButtonView = styled('button')`
  font-family: ${(props) => props.theme.fonts.preface.family};
  font-weight: ${(props) => props.theme.fonts.preface.weight};
  letter-spacing: ${(props) => props.theme.fonts.preface.letterSpacing};
  text-transform: ${(props) => props.theme.fonts.preface.textTransform};
  -webkit-font-smoothing: ${(props) => props.theme.fonts.preface.fontSmoothing};
  font-size: ${(props) => props.theme.fonts.preface.fontSize};
  color: ${(props) =>
    props.theme.links.light[props.active ? 'hover' : 'color']};

  &:hover,
  &:focus {
    color: ${(props) => props.theme.links.light.hover};
  }
`

const NavScrollButton = ({ container, name, active, offset = 0 }) => {
  const id = slugify(name)
  const element = document.getElementById(id)

  const onClick = (evt) => {
    evt.preventDefault()
    evt.target.blur()
    container.scrollTo({
      top: element.offsetTop + offset,
      left: 0,
      behavior: 'smooth',
    })
  }

  return (
    <NavScrollButtonView onClick={onClick} active={active}>
      {name}
    </NavScrollButtonView>
  )
}

const NavScrollView = styled('div')`
  width: 100%;
  overflow-x: scroll;
  transition: all 500ms ease;

  ul {
    position: relative;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    height: 6rem;

    li {
      display: block;
      flex-shrink: 0;
      font-size: ${(props) => props.theme.fonts.preface.fontSize};
      padding: 0 0 0 ${(props) => props.theme.layout.padding};
      @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
        padding-left: ${(props) => props.theme.layout.paddingMobile};
      }

      &:last-child {
        padding-right: ${(props) => props.theme.layout.padding};
        @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
          padding-right: ${(props) => props.theme.layout.paddingMobile};
        }
      }
    }
  }
`

// const eventThrottler = (eventHandler) => throttle(eventHandler, 2000)

const NavScroll = ({ items, offset = 0 }) => {
  const { windowRef } = useContext(AppContext)
  const navRef = useRef(null)
  const listRef = useRef(null)
  const [active, setActive] = useState(null)
  const topOffset = 121
  const elements = Array.from(document.getElementsByName('section'))

  useEffect(() => {
    const winRef = windowRef.current
    const handleScroll = () => {
      if (elements.length) setActive(getActiveElement(elements, topOffset))
    }
    winRef.addEventListener('scroll', handleScroll)
    return () => {
      winRef.removeEventListener('scroll', () => handleScroll)
    }
  }, [windowRef, topOffset, elements])

  useEffect(() => {
    if (active) {
      const navActive = document.getElementById(`nav-${active.id}`)
      if (navActive) {
        const navOffset = navActive.getBoundingClientRect().x
        const parentOffset = navActive.offsetParent.getBoundingClientRect().x
        const offsetLeft = navOffset - parentOffset
        navRef.current.scrollTo({
          top: 0,
          left: offsetLeft,
          behavior: 'smooth',
        })
      }
    }
  }, [active])

  return (
    <NavScrollView ref={navRef}>
      <ul ref={listRef}>
        {items.map((name, index) => {
          const sectionId = slugify(name)
          const activeId = active ? active.id : null
          return (
            <li key={`${sectionId}-${index}`} id={`nav-${sectionId}`}>
              <NavScrollButton
                container={windowRef.current}
                name={name}
                offset={offset}
                active={activeId === sectionId}
              />
            </li>
          )
        })}
      </ul>
    </NavScrollView>
  )
}

NavScroll.displayName = 'NavScroll'
NavScroll.propTypes = {
  items: propTypes.array,
  offset: propTypes.number,
}

export default NavScroll
