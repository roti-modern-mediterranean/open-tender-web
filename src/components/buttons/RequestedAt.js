import React from 'react'
import propTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import {
  selectOrder,
  selectTimezone,
  // setRequestedAt
} from '@open-tender/redux'
import { makeRequestedAtStr } from '@open-tender/js'

import { openModal } from '../../slices'
import iconMap from '../iconMap'
import { ButtonBoth } from '.'

const RequestedAt = ({
  icon = iconMap.Clock,
  style = null,
  useButton = false,
}) => {
  const dispatch = useDispatch()
  const { requestedAt, revenueCenter } = useSelector(selectOrder)
  const tz = useSelector(selectTimezone)
  const requestedAtText = makeRequestedAtStr(requestedAt, tz)

  if (!revenueCenter || !requestedAt) return null

  // useEffect(() => {
  //   if (!requestedAt || !revenueCenter) setRequestedAt('asap')
  // }, [requestedAt, revenueCenter])

  return (
    <ButtonBoth
      text={requestedAtText}
      icon={icon}
      onClick={() => dispatch(openModal({ type: 'requestedAt' }))}
      style={style}
      useButton={useButton}
    />
  )
}

RequestedAt.displayName = 'RequestedAt'
RequestedAt.propTypes = {
  icon: propTypes.element,
  style: propTypes.object,
  useButton: propTypes.bool,
}

export default RequestedAt
