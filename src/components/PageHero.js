import propTypes from 'prop-types'
import styled from '@emotion/styled'
import { BgImage, Box, useImage } from '@open-tender/components'

import { BackgroundImage, BackgroundLoading, Hero, Slider } from '.'
// import { makeSlides } from './HeroSlides'
import { selectTheme } from '../slices'
import { useSelector } from 'react-redux'
import { ClipLoader } from 'react-spinners'
import SliderNew from './SliderNew'
import { isBrowser } from 'react-device-detect'

const PageHeroView = styled('div')`
  position: relative;
  display: flex;
  flex-grow: 1;
  min-height: 42rem;
  max-height: 48rem;
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    flex-direction: column-reverse;
    max-height: 100%;
    min-height: 0;
  }
`

const PageHeroGreeting = styled('div')`
  flex-grow: 0;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  padding: ${(props) => props.theme.layout.padding};
  background-color: ${(props) => props.theme.bgColors.primary};
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    padding: 2rem ${(props) => props.theme.layout.paddingMobile};
    background-color: ${(props) => props.theme.bgColors.primary};
  }
`

const PageHeroContent = styled('div')`
  flex-grow: 1;
  position: relative;
  display: flex;
`

const makeImageUrl = (images, isBrowser) => {
  return images.find((i) =>
    i.type === isBrowser ? 'FEATURED_IMAGE' : 'SECONDARY_IMAGE'
  ).url
}

const makeSlides = (items) => {
  if (!items || !items.length) return null
  return items.map((i) => ({
    ...i,
    imageUrl: makeImageUrl(i.images, isBrowser),
  }))
}

const PageHero = ({ announcements, imageUrl, children }) => {
  const { settings, entities, loading, error } = announcements || {}
  const slides = error ? null : makeSlides(entities)
  const isLoading = loading === 'pending'
  // const hasAnnouncements = entities && entities.length > 0

  return (
    <PageHeroView minHeight={announcements ? '18rem' : '0'}>
      {children && <PageHeroGreeting>{children}</PageHeroGreeting>}
      <PageHeroContent>
        {isLoading ? (
          <BackgroundLoading />
        ) : slides ? (
          <SliderNew settings={settings} slides={slides} />
        ) : (
          <BackgroundImage imageUrl={imageUrl} />
        )}
      </PageHeroContent>
    </PageHeroView>
  )
}

PageHero.displayName = 'PageHero'
PageHero.propTypes = {
  imageUrl: propTypes.string,
  announcements: propTypes.object,
  showHero: propTypes.bool,
  children: propTypes.oneOfType([
    propTypes.arrayOf(propTypes.node),
    propTypes.node,
  ]),
}

export default PageHero
