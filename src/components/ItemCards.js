import React from 'react'
import propTypes from 'prop-types'
import styled from '@emotion/styled'

const ItemCardsView = styled('div')`
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  margin: 0 -1.2rem;
  opacity: 0;
  animation: slide-up 0.25s ease-in-out 0.25s forwards;
  @media (max-width: ${(props) => props.theme.breakpoints.narrow}) {
    flex-direction: column;
    justify-content: flex-start;
    margin: 0;
  }
`
const ItemCardsItem = styled('div')`
  width: 33.33333%;
  padding: 0 1.2rem 1.2rem;
  @media (max-width: ${(props) => props.theme.breakpoints.narrow}) {
    width: 100%;
    padding: 0 0 1.2rem;
  }
`

const ItemCards = ({ items, renderItem }) => {
  return (
    <ItemCardsView>
      {items.map((item, index) => {
        return (
          <ItemCardsItem key={`${item.id}-${index}`}>
            {renderItem({ item, index })}
          </ItemCardsItem>
        )
      })}
    </ItemCardsView>
  )
}

ItemCards.displayName = 'ItemCards'
ItemCards.propTypes = {
  items: propTypes.array,
  delay: propTypes.number,
  sequential: propTypes.bool,
  renderItem: propTypes.func,
}

export default ItemCards
