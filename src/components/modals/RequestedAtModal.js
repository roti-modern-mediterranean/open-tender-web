import React from 'react'
import propTypes from 'prop-types'
import { useSelector, useDispatch } from 'react-redux'
import { selectOrder, setRequestedAt } from 'open-tender-redux'

import { closeModal } from '../../slices'
import ModalClose from '../ModalClose'
import RequestedAtCalendar from '../RequestedAtCalendar'
import RequestedAtTimes from '../RequestedAtTimes'

const RequestedAtModal = ({ forcedUpdate = false, onCloseAction }) => {
  const dispatch = useDispatch()
  const { requestedAt, serviceType, revenueCenter } = useSelector(selectOrder)
  const { settings } = revenueCenter || {}
  const { first_times, order_times } = settings || {}
  const firstTimes = first_times ? first_times[serviceType] : null
  const orderTimes = order_times ? order_times[serviceType] : null

  const handleClose = () => {
    dispatch(closeModal())
  }

  const handleRequestedAt = (requestedAt) => {
    dispatch(setRequestedAt(requestedAt))
    dispatch(closeModal())
    if (onCloseAction) dispatch(onCloseAction())
  }

  return (
    <>
      <ModalClose onClick={handleClose} />
      {firstTimes ? (
        <RequestedAtCalendar
          forcedUpdate={forcedUpdate}
          requestedAt={requestedAt}
          serviceType={serviceType}
          revenueCenter={revenueCenter}
          handleClose={handleClose}
          setRequestedAt={handleRequestedAt}
        />
      ) : orderTimes ? (
        <RequestedAtTimes
          orderTimes={orderTimes}
          serviceType={serviceType}
          revenueCenter={revenueCenter}
          requestedAt={requestedAt}
          setRequestedAt={handleRequestedAt}
        />
      ) : null}
    </>
  )
}

RequestedAtModal.displayName = 'RequestedAtModal'
RequestedAtModal.propTypes = {
  close: propTypes.func,
}

export default RequestedAtModal
