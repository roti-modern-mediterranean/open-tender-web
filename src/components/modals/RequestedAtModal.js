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
import { makeRequestedAtString } from '../../packages/utils/datetimes'

const RequestedAtModal = () => {
  const dispatch = useDispatch()
  const { requestedAt, serviceType, location } = useSelector(selectOrder)
  const tz = useSelector(selectTimezone)

  const handleClose = () => {
    dispatch(closeModal())
  }

  const handleRequestedAt = (requestedAt) => {
    dispatch(setRequestedAt(requestedAt))
    dispatch(closeModal())
  }

  const requestedAtText = makeRequestedAtString(requestedAt, tz, true)

  return (
    <>
      <ModalClose onClick={handleClose} />
      <div className="modal__content">
        <div className="modal__header">
          <p>Your current order time is</p>
          <p className="modal__title heading ot-font-size-h3">
            {/* Adjust your order time */}
            {requestedAtText}
          </p>
          <p className="modal__subtitle">
            {/* <span className="ot-bold">
              Your current order time is {requestedAtText}.
            </span> */}
            Choose a date and time below to make a change.
          </p>
        </div>
        <RequestedAtPicker
          requestedAt={requestedAt}
          serviceType={serviceType}
          location={location}
          setRequestedAt={handleRequestedAt}
          cancel={handleClose}
        />
      </div>
    </>
  )
}

RequestedAtModal.displayName = 'RequestedAtModal'
RequestedAtModal.propTypes = {
  close: propTypes.func,
}

export default RequestedAtModal
