import React from 'react'
import propTypes from 'prop-types'
import { useSelector, useDispatch } from 'react-redux'
import { selectOrder, setRequestedAt } from '../../slices/orderSlice'
import { closeModal } from '../../slices/modalSlice'
import ModalClose from '../ModalClose'
import RequestedAtCalendar from '../RequestedAtCalendar'
import RequestedAtTimes from '../RequestedAtTimes'
import { menuServiceTypeMap } from '../../packages/utils/constants'

const RequestedAtModal = ({ forcedUpdate = false, onCloseAction }) => {
  const dispatch = useDispatch()
  const { requestedAt, serviceType, revenueCenter } = useSelector(selectOrder)
  const { settings } = revenueCenter || {}
  const { first_times, order_times } = settings || {}
  const menuServiceType = menuServiceTypeMap[serviceType]
  const firstTimes = first_times ? first_times[menuServiceType] : null
  const orderTimes = order_times ? order_times[menuServiceType] : null

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
          serviceType={menuServiceType}
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
