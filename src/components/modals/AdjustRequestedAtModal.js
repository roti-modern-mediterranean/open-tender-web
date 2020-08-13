import React from 'react'
import propTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import {
  setServiceType,
  setRequestedAt,
  resetRevenueCenter,
  resetMenuVars,
  fetchMenu,
} from '@open-tender/redux'
import {
  capitalize,
  makeReadableDateStrFromIso,
  timezoneMap,
} from '@open-tender/js'
import { Button } from '@open-tender/components'

import { closeModal } from '../../slices'
import ModalTitle from '../ModalTitle'

const AdjustRequestedAtModal = ({ firstTimes, revenueCenter }) => {
  const dispatch = useDispatch()
  const tz = timezoneMap[revenueCenter.timezone]
  const revenueCenterId = revenueCenter.revenue_center_id

  const handleUpdate = (evt, { serviceType, requestedAt }) => {
    evt.preventDefault()
    dispatch(setServiceType(serviceType))
    dispatch(setRequestedAt(requestedAt))
    dispatch(resetMenuVars())
    dispatch(fetchMenu({ revenueCenterId, serviceType, requestedAt }))
    dispatch(closeModal())
    evt.target.blur()
  }

  const changeLocation = (evt) => {
    evt.preventDefault()
    dispatch(resetRevenueCenter())
    dispatch(closeModal())
    evt.target.blur()
  }

  const [current, other] = firstTimes
  const m = makeReadableDateStrFromIso
  const currentStr = current
    ? `${capitalize(current.serviceType)} ${m(current.requestedAt, tz, true)}`
    : ''
  const otherStr = other
    ? `${capitalize(other.serviceType)} ${m(other.requestedAt, tz, true)}`
    : ''

  return (
    <>
      <div className="modal__content">
        <div className="modal__header">
          <ModalTitle title="Order time not currently available" />
        </div>
        <div className="modal__body">
          <p>
            This location can't accommodate your currently selected order time
            and service type. Please choose an option below.
          </p>
        </div>
        <div className="modal__footer">
          <div className="modal__footer__buttons">
            {current && (
              <Button
                text={currentStr}
                classes="ot-btn"
                onClick={(evt) => handleUpdate(evt, current)}
              />
            )}
            {other && (
              <Button
                text={otherStr}
                classes="ot-btn"
                onClick={(evt) => handleUpdate(evt, other)}
              />
            )}
            <Button
              text="Change Location"
              classes="ot-btn"
              onClick={changeLocation}
            />
          </div>
        </div>
      </div>
    </>
  )
}

AdjustRequestedAtModal.displayName = 'AdjustRequestedAtModal'
AdjustRequestedAtModal.propTypes = {
  firstTimes: propTypes.array,
  revenueCenter: propTypes.object,
}

export default AdjustRequestedAtModal
