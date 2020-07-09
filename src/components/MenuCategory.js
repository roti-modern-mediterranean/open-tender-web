import React from 'react'
import propTypes from 'prop-types'
import { slugify } from '@open-tender/js'
import MenuItem from './MenuItem'

const MenuCategory = ({ category, isChild }) => {
  const child = isChild ? '-child' : ''
  return (
    <div
      key={category.id}
      id={slugify(category.name)}
      className={`menu__category ${child}`}
    >
      <div className="menu__category__header">
        <div className="container">
          {isChild ? (
            <h3 className="menu__category__title">{category.name}</h3>
          ) : (
            <h2 className="menu__category__title">{category.name}</h2>
          )}
          {category.description && (
            <p className="menu__category__subtitle ot-color-secondary ot-line-height">
              {category.description}
            </p>
          )}
        </div>
      </div>
      <div className="menu__items">
        {category.items.map((item) => (
          <MenuItem key={item.id} item={item} />
        ))}
      </div>
    </div>
  )
}

MenuCategory.displayName = 'MenuCategory'
MenuCategory.propTypes = {
  category: propTypes.object,
  isChild: propTypes.bool,
  isPreview: propTypes.bool,
}

export default MenuCategory
