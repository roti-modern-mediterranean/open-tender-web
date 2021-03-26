import React from 'react'
import propTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import styled from '@emotion/styled'

import { openModal } from '../../../slices'
import {
  CardList,
  CardListItem,
  CardListSmall,
  CardListItemSmall,
  Container,
  PageTitle,
  MoreLink,
} from '../..'
import MenuItem from './MenuItem'
import iconMap from '../../iconMap'

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

const AllergenFilterView = styled('div')`
  margin: 0 0 0.5rem;
`

const MenuCategory = ({ category, isChild, index }) => {
  const dispatch = useDispatch()

  return (
    <MenuCategoryView isChild={isChild} index={index}>
      <Container>
        <PageTitle
          title={category.name}
          subtitle={category.description}
          style={{ alignItems: 'flex-end' }}
        >
          <AllergenFilterView>
            <MoreLink
              onClick={() => dispatch(openModal({ type: 'allergens' }))}
              text="Filter"
              icon={iconMap.Sliders}
            />
          </AllergenFilterView>
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
