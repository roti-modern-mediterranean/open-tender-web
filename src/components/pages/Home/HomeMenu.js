import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchMenuDisplay, selectMenuDisplay } from '@open-tender/redux'

import { PageSection } from '../..'
import { selectConfig } from '../../../slices'
import styled from '@emotion/styled'
import HomeMenuCategory from './HomeMenuCategory'

const homeCategories = ['Bowls', 'Salads', 'Pitas']

const HomeMenuCategories = styled('div')`
  display: flex;
  margin: 0 -1.2rem;
`

const HomeMenu = () => {
  const dispatch = useDispatch()
  const { home } = useSelector(selectConfig)
  const { title, subtitle } = home
  const revenueCenterId = 508
  const serviceType = 'PICKUP'
  const weekday = 'MONDAY'
  const minutes = 720
  const { categories, loading, error } = useSelector(selectMenuDisplay)
  const filtered = categories.filter((i) => homeCategories.includes(i.name))
  console.log(filtered)

  useEffect(() => {
    const menuDisplayVars = { revenueCenterId, serviceType, weekday, minutes }
    dispatch(fetchMenuDisplay(menuDisplayVars))
  }, [dispatch, revenueCenterId, weekday, minutes])

  return (
    <PageSection title={title} subtitle={subtitle}>
      <HomeMenuCategories>
        {filtered.map((category) => (
          <HomeMenuCategory key={category.id} category={category} />
        ))}
      </HomeMenuCategories>
    </PageSection>
  )
}

HomeMenu.displayName = 'HomeMenu'
export default HomeMenu
