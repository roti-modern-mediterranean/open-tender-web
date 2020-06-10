import React from 'react'
import propTypes from 'prop-types'
import OrderImage from './OrderImage'

const OrderImages = ({ items }) => {
  return items.map((i) =>
    i.images
      .filter((m) => m.type === 'SMALL_IMAGE' && m.url)
      .map((image) => {
        return (
          <OrderImage
            key={image.url}
            imageUrl={image.url}
            alt={i.name}
            title={i.name}
          />
        )
      })
  )
}

OrderImages.displayName = 'OrderImages'
OrderImages.propTypes = {
  items: propTypes.array,
}

export default OrderImages
