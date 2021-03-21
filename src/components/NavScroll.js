import React, { useState, useRef, useEffect, useContext } from 'react'
import propTypes from 'prop-types'
import { slugify } from '@open-tender/js'

import { AppContext } from '../App'
import styled from '@emotion/styled'
import { NavScrollButton } from '.'

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

const NavScrollView = styled('div')`
  width: 100%;
  overflow-x: scroll;
  transition: all 500ms ease;
  display: flex;
  justify-content: center;
  align-items: center;
  height: ${(props) => props.navHeight};
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    justify-content: flex-start;
  }

  ul {
    position: relative;
    display: inline-flex;
    align-items: center;
    height: 3.8rem;
    border-radius: ${(props) => props.theme.border.radius};
    background-color: ${(props) => props.theme.bgColors.light};
    @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
      margin: 0 2rem;
    }

    li {
      display: block;
      height: 100%;
      flex-shrink: 0;
    }
  }
`

// https://stackoverflow.com/questions/51229742/javascript-window-scroll-behavior-smooth-not-working-in-safari
const smoothHorizontalScrolling = (container, time, amount, start) => {
  let eAmt = amount / 100
  let curTime = 0
  let scrollCounter = 0
  while (curTime <= time) {
    window.setTimeout(shs, curTime, container, scrollCounter, eAmt, start)
    curTime += time / 100
    scrollCounter++
  }
}

const shs = (e, sc, eAmt, start) => {
  e.scrollLeft = eAmt * sc + start
}

const NavScroll = ({ items, scrollOffset = 0, navHeight, topOffset }) => {
  const { windowRef } = useContext(AppContext)
  const navRef = useRef(null)
  const listRef = useRef(null)
  const [active, setActive] = useState(null)
  const elements = Array.from(document.getElementsByName('section'))

  useEffect(() => {
    const winRef = windowRef.current
    const handleScroll = () => {
      if (elements.length) {
        setActive(getActiveElement(elements, topOffset))
      }
    }
    winRef.addEventListener('scroll', handleScroll)
    return () => {
      winRef.removeEventListener('scroll', () => handleScroll)
    }
  }, [windowRef, topOffset, elements, active])

  useEffect(() => {
    if (active) {
      const navActive = document.getElementById(`nav-${active.id}`)
      if (navActive) {
        const navOffset = navActive.getBoundingClientRect().x
        const parentOffset = navActive.offsetParent.getBoundingClientRect().x
        if (navRef.current) {
          smoothHorizontalScrolling(
            navRef.current,
            250,
            navOffset,
            -parentOffset
          )
        }
      }
    }
  }, [active])

  return (
    <NavScrollView ref={navRef} navHeight={navHeight}>
      <ul ref={listRef}>
        {items.map((item, index) => {
          const sectionId = slugify(item.name)
          const activeId = active ? active.id : null
          return (
            <li key={`${sectionId}-${index}`} id={`nav-${sectionId}`}>
              <NavScrollButton
                container={windowRef.current}
                item={item}
                offset={scrollOffset}
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
