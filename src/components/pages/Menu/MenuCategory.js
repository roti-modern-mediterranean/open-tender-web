import React from 'react'
import propTypes from 'prop-types'
import MenuItem from './MenuItem'
import styled from '@emotion/styled'
import { CardList, CardListItem, Container, PageSectionHeader } from '../..'

export const MenuCategoryView = styled('div')`
  opacity: 0;
  animation: slide-up 0.25s ease-in-out 0.125s forwards;
  padding: ${(props) => (props.isChild ? '2rem 0 0' : '4rem 0 0')};
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    padding: ${(props) => (props.isChild ? '2rem 0 0' : '3rem 0 0')};
  }
`

const MenuCategory = ({ category, isChild }) => {
  return (
    <MenuCategoryView isChild={isChild}>
      <Container>
        <PageSectionHeader>
          {isChild ? <h3>{category.name}</h3> : <h2>{category.name}</h2>}
          {category.description && <p>{category.description}</p>}
        </PageSectionHeader>
        <CardList>
          {category.items.map((item) => (
            <CardListItem>
              <MenuItem key={item.id} item={item} />
            </CardListItem>
          ))}
        </CardList>
      </Container>
    </MenuCategoryView>
  )
}

MenuCategory.displayName = 'MenuCategory'
MenuCategory.propTypes = {
  category: propTypes.object,
  isChild: propTypes.bool,
  isPreview: propTypes.bool,
}

export default MenuCategory
