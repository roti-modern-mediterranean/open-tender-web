import React from 'react'
import propTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { startOver } from '../slices/orderSlice'
import { selectConfig } from '../slices/configSlice'
import { Location } from './Location'

export const Locations = ({ locations }) => {
  const { locations: locationsConfig } = useSelector(selectConfig)
  const { title, content } = locationsConfig
  const dispatch = useDispatch()
  return (
    <div className="card card--location overlay border-radius slide-up">
      <div className="card__header">
        <h1>
          {locations.length} {title}
        </h1>
        <p>
          {content} or{' '}
          <button
            className="btn-link"
            aria-label="Start Over"
            onClick={() => dispatch(startOver())}
          >
            click here to start over
          </button>
          .
        </p>
      </div>
      <div className="card__content">
        <ul>
          {locations.map((location) => (
            <li key={location.revenue_center_id}>
              <Location
                location={location}
                showImage={true}
                isOrder={true}
                classes="location--card"
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

Locations.displayName = 'Locations'
Locations.propTypes = {
  locations: propTypes.array,
}

export default Locations
