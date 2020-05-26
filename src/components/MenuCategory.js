import React from 'react'
import propTypes from 'prop-types'
import { slugify } from '../packages/utils/helpers'
import MenuItem from './MenuItem'

const MenuCategory = ({ category, itemEdit, isChild }) => {
  const child = isChild ? '-child' : ''
  return (
    <div
      key={category.id}
      id={slugify(category.name)}
      className={`menu__category ${child}`}
    >
      <div className="menu__category__header">
        {isChild ? (
          <h3 className="menu__category__title">{category.name}</h3>
        ) : (
          <h2 className="menu__category__title">{category.name}</h2>
        )}
        <p>{category.description}</p>
      </div>
      <div className="menu__items">
        {category.items.map((item) => (
          <MenuItem key={item.id} item={item} handler={itemEdit} />
        ))}
      </div>
    </div>
  )
}

MenuCategory.displayName = 'MenuCategory'
MenuCategory.propTypes = {
  category: propTypes.object,
  itemEdit: propTypes.func,
  isChild: propTypes.bool,
  isPreview: propTypes.bool,
}

export default MenuCategory
