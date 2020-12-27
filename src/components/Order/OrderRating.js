import React from 'react'
import propTypes from 'prop-types'

import iconMap from '../iconMap'
import styled from '@emotion/styled'

const OrderRatingStars = styled('div')`
  display: flex;
  margin: 0.25rem 0 0.5rem;
  span {
    display: block;
    margin: 0 0.5rem 0 0;
    width: 2rem;
    height: 2rem;
    color: ${(props) => props.theme.fonts.headings.color};
  }
`

const OrderRating = ({ rating, comments }) => {
  const stars = []
  for (let i = 0; i < rating; i++) {
    stars.push(i)
  }
  return (
    <>
      <p>
        <OrderRatingStars>
          {stars.map((star) => (
            <span key={star}>{iconMap.Star}</span>
          ))}
        </OrderRatingStars>
      </p>
      {comments.length ? <p>{comments}</p> : null}
    </>
  )
}

OrderRating.displayName = 'OrderRating'
OrderRating.propTypes = {
  rating: propTypes.number,
  comments: propTypes.string,
}

export default OrderRating
