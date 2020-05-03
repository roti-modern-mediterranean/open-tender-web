import React from 'react'
import propTypes from 'prop-types'
import StickyNav from './StickyNav'
import MenuCategory from './MenuCategory'

const Menu = ({ categories, itemEdit }) => {
  const navItems = categories ? categories.map((i) => i.name) : []
  return (
    <>
      <StickyNav items={navItems} offset={0} />
      <div className="menu container">
        {categories.map((category) => (
          <div key={category.id}>
            <MenuCategory category={category} itemEdit={itemEdit} />
            {category.children.map((category) => (
              <MenuCategory
                key={category.id}
                category={category}
                itemEdit={itemEdit}
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
