import React, { useState, useEffect, useRef, useContext } from 'react'

import StickyNav from './StickyNav'
import { MenuContext } from './MenuPage'
import MenuRevenueCenters from './MenuRevenueCenters'
import MenuCategories from './MenuCategories'
import MenuLoading from './MenuLoading'
import RevenueCenter from './RevenueCenter'
import Hero from './Hero'

const Menu = () => {
  const {
    revenueCenter,
    categories,
    revenueCenters,
    error,
    menuConfig,
  } = useContext(MenuContext)

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

  console.log(selected)

  return (
    <>
      {selected ? (
        <Hero
          imageUrl={selected.large_image_url}
          classes="hero--right hero--top"
        >
          {/* <RevenueCenter
            revenueCenter={revenueCenter}
            classes="rc--hero slide-up"
            isMenu={true}
          /> */}
        </Hero>
      ) : revenueCenter ? (
        <Hero imageUrl={menuConfig.background} classes="hero--right hero--top">
          <RevenueCenter
            revenueCenter={revenueCenter}
            classes="rc--hero slide-up"
            isMenu={true}
          />
        </Hero>
      ) : null}
      {!error && (
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
      )}
    </>
  )
}

Menu.displayName = 'Menu'

export default Menu
