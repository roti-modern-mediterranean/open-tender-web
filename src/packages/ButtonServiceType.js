import React from 'react'
import propTypes from 'prop-types'
import Button from './Button'
import { serviceTypeNamesMap } from './utils/constants'

const ButtonServiceType = ({ serviceType, onClick, classes = 'btn' }) => {
  const serviceTypeName = serviceTypeNamesMap[serviceType]
  return (
    <Button
      text={serviceTypeName}
      ariaLabel={`Change service type from ${serviceTypeName}`}
      icon={serviceType === 'PICKUP' ? 'ShoppingBag' : 'Truck'}
      classes={classes}
      onClick={onClick}
    />
  )
}

ButtonServiceType.displayName = 'ButtonServiceType'
ButtonServiceType.propTypes = {
  serviceType: propTypes.string,
  onClick: propTypes.func,
  classes: propTypes.string,
}

export default ButtonServiceType
