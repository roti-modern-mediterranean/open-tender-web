import React, { useState } from 'react'
import propTypes from 'prop-types'

import MenuItemOption from './MenuItemOption'

const MenuItemExpand = ({ item }) => {
  const [activeOption, setActiveOption] = useState(null)
  const group = item.option_groups[0]
  const options = group.option_items

  return options.map((option) => (
    <MenuItemOption
      key={option.id}
      item={item}
      group={group}
      option={option}
      activeOption={activeOption}
      setActiveOption={setActiveOption}
    />
  ))
}

MenuItemExpand.displayName = 'MenuItemExpand'
MenuItemExpand.propTypes = {
  item: propTypes.object,
}

export default MenuItemExpand
