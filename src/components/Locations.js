import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  fetchLocations,
  loadingLocations,
  selectLocations,
} from '../slices/locationsSlice'

const Locations = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchLocations('OLO'))
  }, [dispatch])
  const locations = useSelector(selectLocations)
  const loading = useSelector(loadingLocations)
  console.log(locations)
  return (
    <div>
      {loading === 'loading' && <p>Loading locations...</p>}
      <ul>
        {locations.map((i) => (
          <li key={i.revenue_center_id}>{i.full_name}</li>
        ))}
      </ul>
    </div>
  )
}

export default Locations
