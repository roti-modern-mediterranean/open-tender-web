import React from 'react'
import propTypes from 'prop-types'

import { Hero, HeroContent } from '.'
import { isBrowser } from 'react-device-detect'

const makeImageUrl = (images, isBrowser) => {
  return images.find((i) =>
    i.type === isBrowser ? 'FEATURED_IMAGE' : 'SECONDARY_IMAGE'
  ).url
}

export const makeSlides = (items) => {
  if (!items || !items.length) return null
  return items
    .map((i) => ({ ...i, imageUrl: makeImageUrl(i.images, isBrowser) }))
    .map((i) => (
      <Hero key={i.title} {...i}>
        <HeroContent {...i} />
      </Hero>
    ))
}

const HeroSlides = ({ items }) => {
  return makeSlides(items)
}

HeroSlides.displayName = 'HeroSlides'
HeroSlides.propTypes = {
  items: propTypes.array,
}

export default HeroSlides
