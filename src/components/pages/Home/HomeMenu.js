import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { isBrowser } from 'react-device-detect'
import styled from '@emotion/styled'
import {
  fetchMenuDisplay,
  selectMenuDisplay,
  setOrderServiceType,
  resetOrderType,
  selectOrder,
} from '@open-tender/redux'

import { Container } from '../..'
import { selectConfig } from '../../../slices'
import { ButtonToggle } from '../../buttons'
import HomeMenuCategory from './HomeMenuCategory'
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
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 0 5rem;
  @media (max-width: ${(props) => props.theme.breakpoints.narrow}) {
    display: none;
  }
`

const HomeMenuTitle = styled('div')`
  flex-grow: 1;

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

const HomeMenuButtons = styled('div')`
  flex: 0 0 48rem;
  // width: 40rem;
  display: flex;
  max-width: 100%;
  margin: 0;
  @media (max-width: ${(props) => props.theme.breakpoints.narrow}) {
    margin: 0 auto;
    width: 100%;
    // max-width: 40rem;
  }

  & > div {
    width: 33.33333%;
    padding: 0 0 0 1.2rem;
    @media (max-width: ${(props) => props.theme.breakpoints.narrow}) {
      padding: 0 0.6rem;
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
  const history = useHistory()
  const { home } = useSelector(selectConfig)
  const { orderType } = useSelector(selectOrder)
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

  const handlePickup = () => {
    dispatch(resetOrderType())
    dispatch(setOrderServiceType('OLO', 'PICKUP'))
    history.push('/locations')
  }

  const handleDelivery = () => {
    dispatch(resetOrderType())
    dispatch(setOrderServiceType('OLO', 'DELIVERY'))
    history.push('/locations')
  }

  const handleCatering = () => {
    if (orderType !== 'CATERING') dispatch(resetOrderType())
    dispatch(setOrderServiceType('CATERING', 'DELIVERY'))
    history.push('/catering')
  }

  return (
    <HomeMenuView>
      <Container>
        <HomeMenuNav categories={filtered} />
        <HomeMenuHeader>
          <HomeMenuTitle>
            <h2>{title}</h2>
            <p>{subtitle}</p>
          </HomeMenuTitle>
          <HomeMenuButtons>
            <ButtonToggle onClick={handlePickup}>Pickup</ButtonToggle>
            <ButtonToggle onClick={handleDelivery}>Delivery</ButtonToggle>
            <ButtonToggle onClick={handleCatering}>Catering</ButtonToggle>
          </HomeMenuButtons>
        </HomeMenuHeader>
        <HomeMenuCategories>
          {filtered.map((category, index) => (
            <HomeMenuCategory
              key={category.id}
              category={category}
              index={index}
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
