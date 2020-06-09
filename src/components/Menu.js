import React from 'react'
import propTypes from 'prop-types'
import StickyNav from './StickyNav'
import MenuCategory from './MenuCategory'

const Menu = ({ categories }) => {
  const navItems = categories ? categories.map((i) => i.name) : []
  return (
    <>
      <StickyNav items={navItems} offset={-90} />
      <div className="menu container">
        {categories.map((category) => (
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
  )
}

Menu.displayName = 'Menu'
Menu.propTypes = {
  categories: propTypes.array,
}

export default Menu
