import React from 'react'
import propTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { selectOrder } from '@open-tender/redux'
import { Button } from '@open-tender/components'

import { openModal } from '../../slices'
import iconMap from '../iconMap'

const ButtonGroupOrder = ({
  text = 'Group Order',
  classes = 'ot-btn--secondary ot-btn--header',
  icon = iconMap['Users'],
}) => {
  const dispatch = useDispatch()
  const { revenueCenter } = useSelector(selectOrder)
  const hasGroupOrdering =
    revenueCenter && revenueCenter.settings.group_ordering_allowed

  const onClick = (evt) => {
    evt.preventDefault()
    dispatch(openModal({ type: 'groupOrder' }))
    evt.target.blur()
  }

  return hasGroupOrdering ? (
    <Button
      text={text}
      ariaLabel="Start A Group Order"
      icon={icon}
      classes={classes}
      onClick={onClick}
    />
  ) : null
}

ButtonGroupOrder.displayName = 'ButtonGroupOrder'
ButtonGroupOrder.propTypes = {
  text: propTypes.string,
  classes: propTypes.string,
  icon: propTypes.element,
}

export default ButtonGroupOrder