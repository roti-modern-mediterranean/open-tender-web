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
    flex: 1 0 15rem;
    max-width: 50%;
    padding: 0 0.5rem;
    margin: 0 0 1rem;
    opacity: 0;
    animation: slide-up 0.25s ease-in-out ${(props) => props.delay} forwards;
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
