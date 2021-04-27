import React from 'react'
import propTypes from 'prop-types'
import styled from '@emotion/styled'

import {
  CardList,
  CardListItem,
  CardListSmall,
  CardListItemSmall,
  Container,
  PageTitle,
} from '../..'
import MenuItem from './MenuItem'
import MenuAllergenFilter from './MenuAllergenFilter'

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
        <PageTitle title={category.name} subtitle={category.description}>
          {index === 0 && <MenuAllergenFilter />}
        </PageTitle>
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
                <MenuItem
                  item={item}
                  category={category}
                  isInverted={index % 2 !== 0}
                />
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
  index: propTypes.number,
}

export default MenuCategory
