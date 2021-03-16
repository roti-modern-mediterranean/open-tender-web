import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchMenuDisplay } from '@open-tender/redux'

import { PageSection } from '../..'
import { selectConfig } from '../../../slices'

const HomeMenu = () => {
  const dispatch = useDispatch()
  const { home } = useSelector(selectConfig)
  const { title, subtitle } = home
  const revenueCenterId = 508
  const serviceType = 'PICKUP'
  const weekday = 'MONDAY'
  const minutes = 720

  useEffect(() => {
    const menuDisplayVars = { revenueCenterId, serviceType, weekday, minutes }
    dispatch(fetchMenuDisplay(menuDisplayVars))
  }, [dispatch, revenueCenterId, weekday, minutes])

  return <PageSection title={title} subtitle={subtitle}></PageSection>
}

HomeMenu.displayName = 'HomeMenu'
export default HomeMenu
