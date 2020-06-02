import propTypes from 'prop-types'
import React, { useState, useRef, useEffect } from 'react'
import { Link } from 'react-scroll'
import { slugify } from '../packages/utils/helpers'

const StickyNav = ({ items, offset = -100, duration = 500 }) => {
  const [isSticky, setSticky] = useState(false)
  const stickyRef = useRef(null)

  const handleScroll = () => {
    if (stickyRef.current) {
      setSticky(stickyRef.current.getBoundingClientRect().top < 60)
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', () => handleScroll)
    }
  }, [])

  const stickyClass = `sticky ot-nav-height ${isSticky ? 'ot-stuck' : ''}`

  return (
    <div className={stickyClass} ref={stickyRef}>
      <div className="sticky__inner ot-sticky-inner bg-color">
        <div className="container ot-nav-height">
          <div className="sticky__items">
            <ul>
              {items.map((item) => {
                const sectionId = slugify(item)
                return (
                  <li key={sectionId}>
                    <Link
                      activeClass="active"
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
    </div>
  )
}

StickyNav.displayName = 'StickyNav'
StickyNav.propTypes = {
  items: propTypes.array,
  offset: propTypes.number,
}

export default StickyNav
