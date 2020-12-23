import React from 'react'
import propTypes from 'prop-types'
import styled from '@emotion/styled'
import { OrderItemCard } from '.'

const ItemCardsView = styled('div')`
  display: flex;
  flex-wrap: wrap;
  margin: 0 -0.5rem;
`
const ItemCardsItem = styled('div')`
    flex: 0 0 12.5%;
    max-width: 30rem;
    padding: 0 0.5rem;
    margin: 0 0 1rem;
    opacity: 0;
    animation: slide-up 0.25s ease-in-out ${(props) => props.delay} forwards;

    @media (max-width: 1280px) {
      flex: 0 0 16.66667%;
    }
    @media (max-width: 1024px) {
      flex: 0 0 25%;
    }
    @media (max-width: 768px) {
      flex: 0 0 33.33333%;
    }
    @media (max-width: 480px) {
      flex: 0 0 50%;
    }
  }
`

const ItemCards = ({ items, delay = 0.125 }) => {
  return (
    <ItemCardsView>
      {items.map((item, index) => {
        return (
          <ItemCardsItem
            key={item.id}
            // delay={`${delay.toFixed(3)}s`}
            delay={`${((index + 1) * 0.125 + delay).toFixed(3)}s`}
          >
            <OrderItemCard item={item} />
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
}

export default ItemCards
