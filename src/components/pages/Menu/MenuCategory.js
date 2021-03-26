import React from 'react'
import propTypes from 'prop-types'
import MenuItem from './MenuItem'
import styled from '@emotion/styled'
import {
  CardList,
  CardListItem,
  CardListSmall,
  CardListItemSmall,
  Container,
  PageSectionHeader,
} from '../..'

export const MenuCategoryView = styled('div')`
  opacity: 0;
  animation: slide-up 0.25s ease-in-out 0.125s forwards;
  background-color: ${(props) =>
    props.theme.bgColors[props.index % 2 === 0 ? 'primary' : 'secondary']};
  padding: ${(props) =>
    props.isChild ? '2rem 0 0' : props.index === 0 ? '4rem 0' : '8rem 0 4rem'};
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    padding: ${(props) =>
      props.isChild
        ? '2rem 0 0'
        : props.index === 0
        ? '3rem 0'
        : '6rem 0 3rem'};
  }
`

const MenuCategory = ({ category, isChild, index }) => {
  return (
    <MenuCategoryView isChild={isChild} index={index}>
      <Container>
        <PageSectionHeader>
          {isChild ? <h3>{category.name}</h3> : <h2>{category.name}</h2>}
          {category.description && <p>{category.description}</p>}
        </PageSectionHeader>
        {category.appearance === 'small' ? (
          <CardListSmall>
            {category.items.map((item) => (
              <CardListItemSmall key={item.id}>
                <MenuItem item={item} category={category} />
              </CardListItemSmall>
            ))}
          </CardListSmall>
        ) : (
          <CardList>
            {category.items.map((item) => (
              <CardListItem key={item.id}>
                <MenuItem item={item} category={category} />
              </CardListItem>
            ))}
          </CardList>
        )}
      </Container>
    </MenuCategoryView>
  )
}

MenuCategory.displayName = 'MenuCategory'
MenuCategory.propTypes = {
  category: propTypes.object,
  isChild: propTypes.bool,
  index: propTypes.bool,
}

export default MenuCategory
