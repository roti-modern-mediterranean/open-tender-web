import React from 'react'
import propTypes from 'prop-types'
import { iconMap } from '../packages/icons'

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
        <p className="font-size-small secondary-color">{comments}</p>
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
