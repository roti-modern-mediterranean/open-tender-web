import React from 'react'
import propTypes from 'prop-types'

const OrderImage = ({ imageUrl, title }) => {
  return (
    <div className="order-card__image border-radius-small ot-box-shadow">
      <img src={imageUrl} title={title} alt={title} />
    </div>
  )
}

OrderImage.displayName = 'OrderImage'
OrderImage.propTypes = {
  imageUrl: propTypes.string,
  title: propTypes.string,
}

export default OrderImage
