import React from 'react'
import propTypes from 'prop-types'
import { useSelector, useDispatch } from 'react-redux'
import { selectOrder, setRequestedAt } from '../../slices/orderSlice'
import { closeModal } from '../../slices/modalSlice'
import ModalClose from '../ModalClose'
import RequestedAtCalendar from '../RequestedAtCalendar'
import RequestedAtTimes from '../RequestedAtTimes'

const RequestedAtModal = ({ forcedUpdate = false, onCloseAction }) => {
  const dispatch = useDispatch()
  const { requestedAt, serviceType, revenueCenter } = useSelector(selectOrder)
  const { settings } = revenueCenter || {}
  const { first_times, order_times } = settings || {}

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
      {first_times ? (
        <RequestedAtCalendar
          forcedUpdate={forcedUpdate}
          requestedAt={requestedAt}
          serviceType={serviceType}
          revenueCenter={revenueCenter}
          handleClose={handleClose}
          setRequestedAt={handleRequestedAt}
        />
      ) : order_times ? (
        <RequestedAtTimes
          order_times={order_times}
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
