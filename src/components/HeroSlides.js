import React from 'react'
import propTypes from 'prop-types'

import { Hero, HeroContent } from '.'

const promotions = [
  {
    title: "Don't miss today's deals!",
    subtitle:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    image_url:
      'http://s3.amazonaws.com/betterboh/u/img/local/2/1610935724_italian_1800x1200.jpg',
    color: null,
    vertical: 'bottom',
    horizontal: 'center',
    overlay: true,
  },
  {
    title: "Don't miss today's deals!",
    subtitle:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    image_url:
      'https://s3.amazonaws.com/betterboh/u/img/local/2/1613691230_sweet-potatoes_1800x1200.jpg',
    color: null,
    vertical: 'bottom',
    horizontal: 'left',
    overlay: true,
  },
  {
    title: "Don't miss today's deals!",
    subtitle:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    image_url:
      'http://s3.amazonaws.com/betterboh/u/img/prod/2/1608048551_jarritos-pineapple_1800x1200.jpg',
    color: null,
    vertical: 'bottom',
    horizontal: 'right',
    overlay: true,
  },
]

export const makeSlides = (items) => {
  items = items.length ? items : promotions
  if (!items || !items.length) return null
  const filteredItems = items
    .filter((i) => i.image_url)
    .map((i) => ({ ...i, imageUrl: i.image_url }))
  return filteredItems.map((i) => (
    <Hero key={i.imageUrl} {...i}>
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
