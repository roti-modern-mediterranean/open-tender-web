import React from 'react'
import propTypes from 'prop-types'
import { useSelector, useDispatch } from 'react-redux'
import {
  timezoneMap,
  makeRequestedAtStr,
  makeEstimatedTime,
  serviceTypeNamesMap,
} from '@open-tender/js'
import { selectOrder, setRequestedAt } from '@open-tender/redux'
import {
  ButtonLink,
  RequestedAtCalendar,
  RequestedAtTimes,
  Text,
} from '@open-tender/components'

import { closeModal, toggleSidebar } from '../../slices'
import { ModalContent, ModalView } from '..'

const RequestedAt = ({
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
  const tz = timezoneMap[revenueCenter.timezone]
  const estimatedTime = makeEstimatedTime(
    requestedAt,
    revenueCenter,
    serviceType
  )
  const requestedAtText = makeRequestedAtStr(requestedAt, tz, true)
  const requestedTime = `${requestedAtText}${
    estimatedTime ? ` (${estimatedTime})` : ''
  }`
  const serviceTypeName = serviceTypeNamesMap[serviceType].toLowerCase()

  const handleRequestedAt = (requestedAt) => {
    dispatch(setRequestedAt(requestedAt))
    dispatch(closeModal())
    if (onCloseAction) dispatch(onCloseAction())
    if (openSidebar) dispatch(toggleSidebar())
  }

  return (
    <ModalView>
      {firstTimes ? (
        <ModalContent
          title={
            forcedUpdate
              ? 'Order date & time updated'
              : 'Choose an order date & time'
          }
          subtitle={
            <Text as="p" color="alert" bold={true}>
              {forcedUpdate
                ? `Your previous order time is no longer available and has been updated
            to ${requestedTime}.`
                : `Your current order time is ${requestedTime}.`}
            </Text>
          }
        >
          <div>
            <Text as="p" size="small">
              <ButtonLink onClick={() => dispatch(closeModal())}>
                Keep this time
              </ButtonLink>{' '}
              or use the calendar below to choose a different day & time.
            </Text>
          </div>
          <RequestedAtCalendar
            requestedAt={requestedAt}
            serviceType={serviceType}
            revenueCenter={revenueCenter}
            setRequestedAt={handleRequestedAt}
          />
        </ModalContent>
      ) : orderTimes ? (
        <ModalContent
          title="Choose an order date & time"
          subtitle={
            <p>
              Please select from the available {serviceTypeName} times below
            </p>
          }
        >
          <RequestedAtTimes
            orderTimes={orderTimes}
            revenueCenter={revenueCenter}
            requestedAt={requestedAt}
            setRequestedAt={handleRequestedAt}
          />
        </ModalContent>
      ) : null}
    </ModalView>
  )
}

RequestedAt.displayName = 'RequestedAt'
RequestedAt.propTypes = {
  forcedUpdate: propTypes.bool,
  openSidebar: propTypes.bool,
  onCloseAction: propTypes.func,
}

export default RequestedAt
