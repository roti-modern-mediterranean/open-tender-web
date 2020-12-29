import React, { useState, useRef, useEffect, useContext } from 'react'
import propTypes from 'prop-types'
import { isMobile } from 'react-device-detect'
import { Button } from '@open-tender/components'

import iconMap from './iconMap'
import { AppContext } from '../App'
import NavScroll from './NavScroll'

const NavSticky = ({ items, offset = 0, revenueCenter, change }) => {
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
          {showNav && <NavScroll items={items} offset={offset} />}
        </div>
      </div>
    </div>
  )
}

NavSticky.displayName = 'NavSticky'
NavSticky.propTypes = {
  items: propTypes.array,
  offset: propTypes.number,
  revenueCenter: propTypes.object,
  change: propTypes.func,
}

export default NavSticky
