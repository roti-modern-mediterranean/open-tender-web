import React, { useState, useRef, useEffect } from 'react'
import propTypes from 'prop-types'
import { isMobile } from 'react-device-detect'
import { Link } from 'react-scroll'
import { slugify } from '@open-tender/js'

const StickyNav = ({ items, offset = -100, duration = 500 }) => {
  const [isSticky, setSticky] = useState(false)
  const stickyRef = useRef(null)
  const topOffset = isMobile ? 60 : 60

  useEffect(() => {
    const handleScroll = () => {
      if (stickyRef.current) {
        setSticky(stickyRef.current.getBoundingClientRect().top < topOffset)
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', () => handleScroll)
    }
  }, [topOffset])

  const stickyClass = `sticky ${isSticky ? 'ot-stuck' : ''}`
  const stickyInnerClass = `sticky__inner ot-dark ${
    isSticky ? 'ot-border-color ot-box-shadow' : ''
  }`

  return (
    <div className={stickyClass} ref={stickyRef}>
      <div className={stickyInnerClass}>
        <div className="sticky__items">
          <ul>
            {items.map((item) => {
              const sectionId = slugify(item)
              return (
                <li key={sectionId} className="ot-preface ot-font-size-small">
                  <Link
                    activeClass="active"
                    className="ot-link-light"
                    to={sectionId}
                    spy={true}
                    smooth={true}
                    offset={offset}
                    duration={duration}
                  >
                    {item}
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </div>
  )
}

StickyNav.displayName = 'StickyNav'
StickyNav.propTypes = {
  items: propTypes.array,
  offset: propTypes.number,
}

export default StickyNav
