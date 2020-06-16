import React from 'react'
import propTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { Button } from '../../packages'
import { setServiceType, setRequestedAt } from '../../slices/orderSlice'
import { closeModal } from '../../slices/modalSlice'
import { makeReadableDateStrFromIso } from '../../packages/utils/datetimes'
import { capitalize } from '../../packages/utils/helpers'

const AdjustRequestedAtModal = ({ firstTimes }) => {
  const dispatch = useDispatch()

  const handleUpdate = (evt, { serviceType, firstIso }) => {
    evt.preventDefault()
    dispatch(setServiceType(serviceType))
    dispatch(setRequestedAt(firstIso))
    dispatch(closeModal())
    evt.target.blur()
  }

  console.log(firstTimes)

  const [current, other] = firstTimes
  const m = makeReadableDateStrFromIso
  const currentStr = current
    ? `${capitalize(current.serviceType)} ${m(current.firstIso)}`
    : ''
  const otherStr = other
    ? `${capitalize(other.serviceType)} ${m(other.firstIso)}`
    : ''

  return (
    <>
      <div className="modal__content">
        <div className="modal__header">
          <p className="modal__title heading ot-font-size-h3">
            Menu not currently available
          </p>
        </div>
        <div className="modal__body">
          This location can't accommodate your currently selected order time and
          service type. Please choose an option below.
        </div>
        <div className="modal__footer">
          <div className="modal__footer__buttons">
            {current && (
              <Button
                text={currentStr}
                classes="btn"
                onClick={(evt) => handleUpdate(evt, current)}
              />
            )}
            {other && (
              <Button
                text={otherStr}
                classes="btn"
                onClick={(evt) => handleUpdate(evt, other)}
              />
            )}
          </div>
        </div>
      </div>
    </>
  )
}

AdjustRequestedAtModal.displayName = 'AdjustRequestedAtModal'
AdjustRequestedAtModal.propTypes = {
  firstTimes: propTypes.object,
}

export default AdjustRequestedAtModal
