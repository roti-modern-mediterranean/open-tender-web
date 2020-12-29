import React, { useState, useRef, useEffect, useContext } from 'react'
import propTypes from 'prop-types'
import { isMobile } from 'react-device-detect'
import { Link } from 'react-scroll'
import { slugify } from '@open-tender/js'
import { Button } from '@open-tender/components'

import iconMap from './iconMap'
import { AppContext } from '../App'

const StickyNav = ({
  items,
  revenueCenter,
  change,
  offset = -100,
  duration = 500,
}) => {
  const [isSticky, setSticky] = useState(false)
  const stickyRef = useRef(null)
  const { windowRef } = useContext(AppContext)
  const topOffset = isMobile ? 60 : 60
  const showNav = !(isMobile && revenueCenter)
  const stickyClass = `sticky ${isSticky ? 'ot-stuck' : ''}`
  const stickyInnerClass = `sticky__inner ot-dark ${
    isSticky ? 'ot-border-color ot-box-shadow' : ''
  }`

  useEffect(() => {
    const winRef = windowRef.current
    const handleScroll = () => {
      if (stickyRef.current) {
        setSticky(stickyRef.current.getBoundingClientRect().top < topOffset)
      }
    }
    winRef.addEventListener('scroll', handleScroll)
    return () => {
      winRef.removeEventListener('scroll', () => handleScroll)
    }
  }, [windowRef, topOffset])

  const handleChange = (evt) => {
    evt.preventDefault()
    change(null)
    evt.target.blur()
  }

  return (
    <div className={stickyClass} ref={stickyRef}>
      <div className={stickyInnerClass}>
        <div className="sticky__container">
          {revenueCenter && (
            <div className="sticky__filter">
              <div className="sticky__filter__logo ot-font-size-x-small">
                <img
                  src={revenueCenter.app_image_url}
                  alt={revenueCenter.name}
                />
              </div>
              <div className="sticky__filter__content">
                <Button
                  text="Switch"
                  icon={iconMap['RefreshCw']}
                  onClick={handleChange}
                  classes="ot-btn--small ot-btn--secondary ot-font-size-small"
                />
              </div>
            </div>
          )}
          {showNav && (
            <div className="sticky__items">
              <ul>
                {items.map((item, index) => {
                  const sectionId = slugify(item)
                  return (
                    <li key={`${sectionId}-${index}`} className="ot-preface">
                      <Link
                        activeClass="active"
                        className="ot-link-light"
                        to={sectionId}
                        spy={false}
                        smooth={true}
                        offset={offset}
                        duration={duration}
                        // containerId="app"
                        container={windowRef.current}
                      >
                        {item}
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </div>
          )}
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
