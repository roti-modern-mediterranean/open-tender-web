import React from 'react'
import propTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { resetOrder } from 'open-tender-redux'

import { selectConfig } from '../slices'
import RevenueCenter from './RevenueCenter'

export const RevenueCenters = ({ revenueCenters }) => {
  const { revenueCenters: rcConfig } = useSelector(selectConfig)
  const { title, content } = rcConfig
  const dispatch = useDispatch()
  return (
    <div className="card card--rc ot-opacity-light ot-border-radius slide-up">
      <div className="card__header">
        <h1 className="ot-font-size-h3">
          {revenueCenters.length} {title}
        </h1>
        <p>
          {content} or{' '}
          <button
            className="ot-btn-link"
            aria-label="Start Over"
            onClick={() => dispatch(resetOrder())}
          >
            click here to start over
          </button>
          .
        </p>
      </div>
      <div className="card__content">
        <ul>
          {revenueCenters.map((revenueCenter) => (
            <li key={revenueCenter.revenue_center_id}>
              <RevenueCenter
                revenueCenter={revenueCenter}
                showImage={true}
                isOrder={true}
                classes="rc--card"
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

RevenueCenters.displayName = 'RevenueCenters'
RevenueCenters.propTypes = {
  revenueCenters: propTypes.array,
}

export default RevenueCenters
