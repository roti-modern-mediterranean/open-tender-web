import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { startOver } from '../slices/orderSlice'
import { selectConfig } from '../slices/configSlice'
import { Location } from './Location'

export const LocationsCard = ({ locations }) => {
  const { locations: locationsConfig } = useSelector(selectConfig)
  const { title, content } = locationsConfig
  const dispatch = useDispatch()
  return (
    <div className="card overlay slide-up card--location">
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
