import React from 'react'
import propTypes from 'prop-types'
import { useSelector, useDispatch } from 'react-redux'
import { GoogleMapsAutocomplete } from '../packages'
import { selectConfig } from '../slices/configSlice'
import { setAddress } from '../slices/orderSlice'
import { Location } from './Location'

const MapCard = ({
  locations,
  setCenter,
  maps,
  map,
  sessionToken,
  autocomplete,
}) => {
  const dispatch = useDispatch()
  const { map: mapConfig } = useSelector(selectConfig)
  const { title, subtitle, content } = mapConfig

  return (
    <div className="card map__card overlay border-radius slide-up ot-box-shadow">
      <div className="card__header">
        <p className="preface secondary-color">{subtitle}</p>
        <h1 className="ot-font-size-h3">{title}</h1>
        <p className="secondary-color">{content}</p>
      </div>
      <div className="card__content">
        <GoogleMapsAutocomplete
          maps={maps}
          map={map}
          sessionToken={sessionToken}
          autocomplete={autocomplete}
          setAddress={(address) => dispatch(setAddress(address))}
          setCenter={setCenter}
        />
        {/* <div className="map__locations">
          <ul>
            {locations.map((location) => (
              <li key={location.location_id}>
                <Location
                  location={location}
                  showImage={true}
                  isOrder={true}
                  classes="location--card"
                />
              </li>
            ))}
          </ul>
        </div> */}
      </div>
    </div>
  )
}

MapCard.displayName = 'MapCard'
MapCard.propTypes = {
  locationns: propTypes.array,
  setCenter: propTypes.func,
  maps: propTypes.object,
  map: propTypes.object,
  sessionToken: propTypes.object,
  autocomplete: propTypes.object,
}
export default MapCard
