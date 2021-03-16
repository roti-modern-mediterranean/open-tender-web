import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchMenuDisplay, selectMenuDisplay } from '@open-tender/redux'

import { Container } from '../..'
import { selectConfig } from '../../../slices'
import styled from '@emotion/styled'
import HomeMenuCategory from './HomeMenuCategory'
import { isBrowser } from 'react-device-detect'
import HomeMenuNav from './HomeMenuNav'

const homeCategories = ['Bowls', 'Salads', 'Pitas']

const HomeMenuView = styled('div')`
  margin: ${(props) => props.theme.layout.margin} 0;
  @media (max-width: ${(props) => props.theme.breakpoints.narrow}) {
    margin: 0;
  }

  & > div {
    @media (max-width: ${(props) => props.theme.breakpoints.narrow}) {
      padding: 0;
    }
  }
`

const HomeMenuHeader = styled('div')`
  margin: 0 0 5rem;
  @media (max-width: ${(props) => props.theme.breakpoints.narrow}) {
    display: none;
  }

  h2 {
    line-height: 1;
  }

  p {
    line-height: 1;
    font-size: ${(props) => props.theme.fonts.sizes.xBig};
    margin: 0.5rem 0 0;
    @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
      margin: 0.5rem 0 0;
      font-size: ${(props) => props.theme.fonts.sizes.small};
    }
  }
`

const HomeMenuCategories = styled('div')`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  margin: 0 -1.2rem;
  @media (max-width: ${(props) => props.theme.breakpoints.narrow}) {
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    margin: 0;
  }
`

const HomeMenu = () => {
  const dispatch = useDispatch()
  const { home } = useSelector(selectConfig)
  const { title, subtitle } = home
  const revenueCenterId = 508
  const serviceType = 'PICKUP'
  const weekday = 'MONDAY'
  const minutes = 720
  const { categories } = useSelector(selectMenuDisplay)
  const filtered = categories.filter((i) => homeCategories.includes(i.name))
  // const names = filtered.map((i) => i.name)

  useEffect(() => {
    const menuDisplayVars = { revenueCenterId, serviceType, weekday, minutes }
    dispatch(fetchMenuDisplay(menuDisplayVars))
  }, [dispatch, revenueCenterId, weekday, minutes])

  return (
    <HomeMenuView>
      <Container>
        <HomeMenuNav categories={filtered} />
        <HomeMenuHeader>
          <h2>{title}</h2>
          <p>{subtitle}</p>
        </HomeMenuHeader>
        <HomeMenuCategories>
          {filtered.map((category, index) => (
            <HomeMenuCategory
              key={category.id}
              category={category}
              isInverted={!isBrowser && index % 2 === 0}
            />
          ))}
        </HomeMenuCategories>
      </Container>
    </HomeMenuView>
  )
}

HomeMenu.displayName = 'HomeMenu'
export default HomeMenu
