import React, { useState, useEffect, useRef, useContext } from 'react'
import { useSelector } from 'react-redux'
import { isMobile } from 'react-device-detect'

import { selectDisplaySettings } from '../slices'
import StickyNav from './StickyNav'
import { MenuContext } from './MenuPage'
import MenuRevenueCenters from './MenuRevenueCenters'
import MenuCategories from './MenuCategories'
import MenuLoading from './MenuLoading'
import RevenueCenter from './RevenueCenter'
import Hero from './Hero'
import RevenueCenterChild from './RevenueCenterChild'
import MenuError from './MenuError'

const Menu = () => {
  const {
    revenueCenter,
    categories,
    revenueCenters,
    isLoading,
    error,
    menuConfig,
  } = useContext(MenuContext)
  const {
    menuHero,
    menuHeroMobile,
    menuHeroChild,
    menuHeroChildMobile,
  } = useSelector(selectDisplaySettings)
  const showHero =
    menuHero === undefined ? true : isMobile ? menuHeroMobile : menuHero
  const showHeroChild =
    menuHeroChild === undefined
      ? true
      : isMobile
      ? menuHeroChildMobile
      : menuHeroChild
  const topRef = useRef()
  const [selected, setSelected] = useState(null)
  const [visible, setVisible] = useState([])
  const navItems = visible ? visible.map((i) => i.name) : []

  useEffect(() => {
    if (revenueCenters) {
      if (selected) {
        const id = selected.revenue_center_id
        setVisible(categories.filter((i) => i.revenue_center_id === id))
      } else {
        setVisible([])
      }
    } else {
      setVisible(categories)
    }
  }, [revenueCenters, categories, selected])

  const change = (revenueCenter) => {
    setSelected(revenueCenter)
    window.scrollTo(0, topRef.current.offsetTop)
  }

  return (
    <>
      {selected && showHeroChild && (
        <Hero imageUrl={selected.large_image_url} classes="hero--right">
          <RevenueCenterChild
            revenueCenter={selected}
            classes="rc--hero slide-up"
          />
        </Hero>
      )}
      {!selected && revenueCenter && showHero && (
        <Hero imageUrl={menuConfig.background} classes="hero--right">
          <RevenueCenter
            revenueCenter={revenueCenter}
            classes="rc--hero slide-up"
            isMenu={true}
          />
        </Hero>
      )}
      {!error ? (
        <div className="menu__wrapper">
          <MenuLoading />
          <div ref={topRef}>
            <MenuRevenueCenters
              revenueCenters={revenueCenters}
              selected={selected}
              change={change}
            />
            {visible.length > 0 && (
              <>
                <StickyNav
                  revenueCenter={selected}
                  change={change}
                  items={navItems}
                  offset={-90}
                />
                <MenuCategories categories={visible} />
              </>
            )}
          </div>
        </div>
      ) : !isLoading ? (
        <MenuError />
      ) : null}
    </>
  )
}

Menu.displayName = 'Menu'

export default Menu
