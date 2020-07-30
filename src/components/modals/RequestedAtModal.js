import React from 'react'
import propTypes from 'prop-types'
import { useSelector, useDispatch } from 'react-redux'
import { selectOrder, setRequestedAt } from '@open-tender/redux'
import { RequestedAtCalendar, RequestedAtTimes } from '@open-tender/components'

import { closeModal, toggleSidebar } from '../../slices'
import ModalClose from '../ModalClose'

const RequestedAtModal = ({
  forcedUpdate = false,
  openSidebar = false,
  onCloseAction,
}) => {
  const dispatch = useDispatch()
  const { requestedAt, serviceType, revenueCenter } = useSelector(selectOrder)
  const { settings } = revenueCenter || {}
  const { first_times, order_times } = settings || {}
  const st = serviceType === 'WALKIN' ? 'PICKUP' : serviceType
  const firstTimes = first_times ? first_times[st] : null
  const orderTimes = order_times ? order_times[st] : null

  const handleRequestedAt = (requestedAt) => {
    dispatch(setRequestedAt(requestedAt))
    dispatch(closeModal())
    if (onCloseAction) dispatch(onCloseAction())
    if (openSidebar) dispatch(toggleSidebar())
  }

  return (
    <>
      <ModalClose />
      {firstTimes ? (
        <RequestedAtCalendar
          forcedUpdate={forcedUpdate}
          requestedAt={requestedAt}
          serviceType={serviceType}
          revenueCenter={revenueCenter}
          handleClose={() => dispatch(closeModal())}
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
  forcedUpdate: propTypes.bool,
  openSidebar: propTypes.bool,
  onCloseAction: propTypes.func,
}

export default RequestedAtModal
