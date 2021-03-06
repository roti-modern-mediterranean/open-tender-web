import styled from '@emotion/styled'
import { Hero, Slider } from '.'
import { makeSlides } from './HeroSlides'

const PageHeroView = styled('div')`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  min-height: ${(props) => props.minHeight};
`

const PageHero = ({ announcements, imageUrl, showHero = true }) => {
  if (!announcements && (!imageUrl || !showHero)) return null
  const { settings, entities, loading, error } = announcements || {}
  const slides = makeSlides(entities)
  const isLoading = loading === 'pending'
  const hasAnnouncements = entities && entities.length > 0
  const show =
    showHero && imageUrl && !isLoading && (!hasAnnouncements || error)

  return (
    <PageHeroView minHeight={announcements ? '18rem' : '0'}>
      {slides ? (
        <Slider settings={settings} slides={slides} />
      ) : show ? (
        <Hero imageUrl={imageUrl}>&nbsp;</Hero>
      ) : null}
    </PageHeroView>
  )
}

export default PageHero
