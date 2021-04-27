import React from 'react'
import propTypes from 'prop-types'
import styled from '@emotion/styled'
import { slugify } from '@open-tender/js'

import MenuCategory from './MenuCategory'

const MenuCategoriesView = styled('div')`
  // margin: 0 0 6rem;
  // @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
  //   margin: 0 0 3rem;
  // }
`

const MenuCategories = ({ categories }) => {
  if (!categories || !categories.length) return null
  return (
    <MenuCategoriesView>
      {categories.map((category, index) => (
        <div key={category.id} id={slugify(category.name)} name="section">
          <MenuCategory category={category} index={index} />
          {category.children.map((category) => (
            <MenuCategory
              key={category.id}
              category={category}
              isChild={true}
              index={index}
            />
          ))}
        </div>
      ))}
    </MenuCategoriesView>
  )
}

MenuCategories.displayName = 'MenuCategories'
MenuCategories.propTypes = {
  categories: propTypes.array,
}

export default MenuCategories
