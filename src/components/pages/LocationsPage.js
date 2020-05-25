import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { selectConfig } from '../../slices/configSlice'
import { fetchLocations, selectLocations } from '../../slices/locationsSlice'
import { selectOrder } from '../../slices/orderSlice'
import Background from '../Background'
import { Locations } from '../Locations'

const LocationsPage = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const { locations: locationsConfig } = useSelector(selectConfig)
  const locations = useSelector(selectLocations)
  const { orderType, serviceType } = useSelector(selectOrder)
  const hasTypes = orderType && serviceType

  useEffect(() => {
    if (!hasTypes) history.push('/')
  }, [hasTypes, history])

  useEffect(() => {
    if (orderType) dispatch(fetchLocations({ revenue_center_type: orderType }))
  }, [orderType, dispatch])

  return (
    <div className="content">
      <Background imageUrl={locationsConfig.background} />
      {locations.length ? <Locations locations={locations} /> : null}
    </div>
  )
}

LocationsPage.displayName = 'LocationsPage'
export default LocationsPage
