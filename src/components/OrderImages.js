import React from 'react'
import propTypes from 'prop-types'
import OrderImage from './OrderImage'
import styled from '@emotion/styled'

const OrderCardImagesView = styled('div')`
  display: flex;
  justify-content: flex-start;
  align-items: top;
  margin: 0 0 1rem;
  overflow: hidden;
`

const OrderImages = ({ items }) => {
  return (
    <OrderCardImagesView>
      {items.map((i) =>
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
      )}
    </OrderCardImagesView>
  )
}

OrderImages.displayName = 'OrderImages'
OrderImages.propTypes = {
  items: propTypes.array,
}

export default OrderImages
