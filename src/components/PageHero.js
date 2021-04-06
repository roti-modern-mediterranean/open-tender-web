import propTypes from 'prop-types'
import styled from '@emotion/styled'

import { BackgroundImage, BackgroundLoading, Slider } from '.'
import { isBrowser } from 'react-device-detect'

const PageHeroView = styled('div')`
  flex-grow: 1;
  position: relative;
  display: flex;
  flex-direction: column;
  // min-height: 42rem;
  // max-height: ${(props) => props.maxHeight || '100%'};
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    flex-direction: column;
    // max-height: 100%;
    // min-height: 0;
  }
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    margin: 1em 0;
  }
`

const PageHeroGreeting = styled('div')`
  flex-grow: 0;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  margin: ${(props) => props.theme.layout.margin} 0;
  padding: 0 ${(props) => props.theme.layout.padding};
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    margin: ${(props) => props.theme.layout.marginMobile} 0;
    padding: 0 ${(props) => props.theme.layout.paddingMobile};
    background-color: ${(props) => props.theme.bgColors.primary};
  }
`

const PageHeroContent = styled('div')`
  flex-grow: 1;
  position: relative;
  display: flex;
  min-height: 50rem;
  min-height: 50vh;
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    min-height: 37rem;
  }
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

const PageHero = ({
  announcements,
  imageUrl,
  showHero,
  maxHeight,
  children,
}) => {
  const { settings, entities, loading, error } = announcements || {}
  const slides = error ? null : makeSlides(entities)
  const isLoading = loading === 'pending'
  const hasHero = imageUrl && showHero

  return (
    <PageHeroView maxHeight={maxHeight}>
      {(slides || hasHero) && (
        <PageHeroContent>
          {isLoading ? (
            <BackgroundLoading />
          ) : slides ? (
            <Slider settings={settings} slides={slides} />
          ) : hasHero ? (
            <BackgroundImage imageUrl={imageUrl} />
          ) : null}
        </PageHeroContent>
      )}
      {children && <PageHeroGreeting>{children}</PageHeroGreeting>}
    </PageHeroView>
  )
}

PageHero.displayName = 'PageHero'
PageHero.propTypes = {
  imageUrl: propTypes.string,
  announcements: propTypes.object,
  showHero: propTypes.bool,
  maxHeight: propTypes.string,
  children: propTypes.oneOfType([
    propTypes.arrayOf(propTypes.node),
    propTypes.node,
  ]),
}

export default PageHero
