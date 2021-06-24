import React from 'react'
import propTypes from 'prop-types'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { isBrowser } from 'react-device-detect'
import { useTheme } from '@emotion/react'
import { selectOrder, selectGroupOrder } from '@open-tender/redux'

import { openModal } from '../../slices'
import { People6, People3 } from '../icons'
import { ButtonIcon } from '.'

const GroupOrder = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const theme = useTheme()
  const { cartGuest } = useSelector(selectGroupOrder)
  const { revenueCenter } = useSelector(selectOrder)
  const hasGroupOrdering =
    revenueCenter && revenueCenter.settings.group_ordering
  const size = isBrowser ? 44 : 36
  const color = isBrowser ? theme.colors.paprika : theme.colors.beet

  const onClick = () => {
    const reviewOrders = () => history.push(`/review`)
    dispatch(openModal({ type: 'groupOrder', args: { reviewOrders } }))
  }

  if (!hasGroupOrdering || cartGuest) return null

  return (
    <ButtonIcon
      icon={(props) =>
        isBrowser ? (
          <People6 color={color} {...props} />
        ) : (
          <People3 color={color} {...props} />
        )
      }
      size={size}
      offset="right"
      label="Start A Group Order"
      onClick={onClick}
    />
  )
}

GroupOrder.displayName = 'GroupOrder'
GroupOrder.propTypes = {
  text: propTypes.string,
  icon: propTypes.element,
  style: propTypes.object,
  useButton: propTypes.bool,
}

export default GroupOrder
