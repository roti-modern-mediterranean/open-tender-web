import React from 'react'
import propTypes from 'prop-types'
import { useSelector, useDispatch } from 'react-redux'
import {
  selectOrder,
  setRequestedAt,
  selectTimezone,
} from '../../slices/orderSlice'
import { closeModal } from '../../slices/modalSlice'
import ModalClose from '../ModalClose'
import { RequestedAtPicker } from '../../packages'
import {
  makeRequestedAtStr,
  makeEstimatedTime,
} from '../../packages/utils/datetimes'

const RequestedAtModal = ({ forcedUpdate = false, onCloseAction }) => {
  const dispatch = useDispatch()
  const { requestedAt, serviceType, revenueCenter } = useSelector(selectOrder)
  const tz = useSelector(selectTimezone)

  const handleClose = () => {
    dispatch(closeModal())
  }

  const handleRequestedAt = (requestedAt) => {
    dispatch(setRequestedAt(requestedAt))
    dispatch(closeModal())
    if (onCloseAction) dispatch(onCloseAction())
  }

  const estimatedTime = makeEstimatedTime(
    requestedAt,
    revenueCenter,
    serviceType
  )
  const requestedAtText = makeRequestedAtStr(requestedAt, tz, true)
  const requestedTime = `${requestedAtText}${
    estimatedTime ? ` (${estimatedTime})` : ''
  }`

  return (
    <>
      <ModalClose onClick={handleClose} />
      <div className="modal__content">
        {forcedUpdate ? (
          <div className="modal__header">
            <p className="modal__title heading ot-font-size-h3">
              Order date & time updated
            </p>
            <p className="modal__subtitle ot-bold ot-alert-color">
              Your previous order time is no longer available and has been
              updated to {requestedTime}.
            </p>
          </div>
        ) : (
          <div className="modal__header">
            <p className="modal__title heading ot-font-size-h3">
              Choose an order date & time
            </p>
            <p className="modal__subtitle ot-bold ot-alert-color">
              Your current order time is {requestedTime}.
            </p>
          </div>
        )}
        <div className="modal__body">
          <p className="font-size-small">
            <button className="btn-link" onClick={handleClose}>
              Keep this time
            </button>{' '}
            or use the calendar below to choose a different day & time.
          </p>
          {revenueCenter && (
            <RequestedAtPicker
              requestedAt={requestedAt}
              serviceType={serviceType}
              revenueCenter={revenueCenter}
              setRequestedAt={handleRequestedAt}
            />
          )}
        </div>
      </div>
    </>
  )
}

RequestedAtModal.displayName = 'RequestedAtModal'
RequestedAtModal.propTypes = {
  close: propTypes.func,
}

export default RequestedAtModal
