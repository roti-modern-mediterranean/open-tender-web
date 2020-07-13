import React from 'react'
import propTypes from 'prop-types'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { selectOrder, selectAutoSelect } from '@open-tender/redux'
import { Button } from '@open-tender/components'

import iconMap from '../iconMap'

const ButtonRevenueCenter = ({
  classes = 'ot-btn--secondary ot-btn--header',
  icon = iconMap['MapPin'],
}) => {
  const history = useHistory()
  const { revenueCenter } = useSelector(selectOrder)
  const autoSelect = useSelector(selectAutoSelect)

  const onClick = (evt) => {
    evt.preventDefault()
    history.push(`/locations`)
    evt.target.blur()
  }

  return revenueCenter && !autoSelect ? (
    <Button
      text={revenueCenter.name}
      ariaLabel={`Change location from ${revenueCenter.name}`}
      icon={icon}
      classes={classes}
      onClick={onClick}
    />
  ) : null
}

ButtonRevenueCenter.displayName = 'ButtonRevenueCenter'
ButtonRevenueCenter.propTypes = {
  classes: propTypes.string,
  icon: propTypes.element,
}

export default ButtonRevenueCenter
