import React, { useState, useEffect } from 'react'
import propTypes from 'prop-types'
import StickyNav from './StickyNav'
import MenuCategory from './MenuCategory'
import MenuRevenueCenters from './MenuRevenueCenters'

const Menu = ({ categories, revenueCenters }) => {
  const [selected, setSelected] = useState(null)
  const [visible, setVisible] = useState([])
  const navItems = visible ? visible.map((i) => i.name) : []
  // console.log(revenueCenters)

  useEffect(() => {
    if (revenueCenters) {
      if (selected) {
        const id = selected.revenue_center_id
        setVisible(categories.filter((i) => i.revenue_center_id === id))
      }
    } else {
      setVisible(categories)
    }
  }, [revenueCenters, categories, selected])

  const changeRevenueCenter = (revenueCenter) => {
    console.log('changeRevenueCenter', revenueCenter)
    setSelected(revenueCenter)
  }

  return (
    <>
      <MenuRevenueCenters
        revenueCenters={revenueCenters}
        selected={selected}
        change={changeRevenueCenter}
      />
      {visible.length > 0 && (
        <>
          <StickyNav selected={selected} items={navItems} offset={-90} />
          <div className="menu">
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
    </>
  )
}

Menu.displayName = 'Menu'
Menu.propTypes = {
  categories: propTypes.array,
  revenueCenters: propTypes.array,
}

export default Menu
