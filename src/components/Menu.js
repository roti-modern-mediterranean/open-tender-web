import React, { useState, useEffect, useRef } from 'react'
import propTypes from 'prop-types'
import StickyNav from './StickyNav'
import MenuCategory from './MenuCategory'
import MenuRevenueCenters from './MenuRevenueCenters'

const Menu = ({ categories, revenueCenters }) => {
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
          <div className="menu slide-up">
            {visible.map((category) => (
              <div key={category.id}>
                <MenuCategory category={category} />
                {category.children.map((category) => (
                  <MenuCategory
                    key={category.id}
                    category={category}
                    isChild={true}
                  />
                ))}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  )
}

Menu.displayName = 'Menu'
Menu.propTypes = {
  categories: propTypes.array,
  revenueCenters: propTypes.array,
}

export default Menu
