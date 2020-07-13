import React from 'react'
import propTypes from 'prop-types'

import iconMap from './iconMap'

const OrderRating = ({ rating, comments }) => {
  const stars = []
  for (let i = 0; i < rating; i++) {
    stars.push(i)
  }
  return (
    <>
      <div className="order__stars">
        {stars.map((star) => (
          <span key={star}>{iconMap['Star']}</span>
        ))}
      </div>
      {comments.length ? (
        <p className="ot-font-size-small ot-color-secondary">{comments}</p>
      ) : null}
    </>
  )
}

OrderRating.displayName = 'OrderRating'
OrderRating.propTypes = {
  rating: propTypes.number,
  comments: propTypes.string,
}

export default OrderRating
