import React from 'react'
import propTypes from 'prop-types'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { selectOrder } from '@open-tender/redux'
import { makeServiceTypeName } from '@open-tender/js'
import { Button } from '@open-tender/components'

import { openModal, selectOutpostName } from '../../slices'
import iconMap from '../iconMap'

const ButtonServiceType = ({
  classes = 'ot-btn--secondary ot-btn--header',
}) => {
  const history = useHistory()
  const dispatch = useDispatch()
  const { orderType, serviceType, isOutpost } = useSelector(selectOrder)
  const outpostName = useSelector(selectOutpostName)
  const isCatering = orderType === 'CATERING'
  const serviceTypeName = makeServiceTypeName(
    serviceType,
    isCatering,
    isOutpost,
    outpostName
  )
  const icon = iconMap[serviceType === 'DELIVERY' ? 'Truck' : 'ShoppingBag']

  const handleServiceType = (evt) => {
    evt.preventDefault()
    const startOver = () => history.push(`/`)
    dispatch(openModal({ type: 'orderType', args: { startOver } }))
    evt.target.blur()
  }

  const handleCatering = (evt) => {
    evt.preventDefault()
    history.push(`/catering`)
    evt.target.blur()
  }

  return serviceType ? (
    <Button
      text={serviceTypeName}
      ariaLabel={`Change service type from ${serviceTypeName}`}
      icon={icon}
      classes={classes}
      onClick={isCatering ? handleCatering : handleServiceType}
    />
  ) : null
}

ButtonServiceType.displayName = 'ButtonServiceType'
ButtonServiceType.propTypes = {
  classes: propTypes.string,
}

export default ButtonServiceType
