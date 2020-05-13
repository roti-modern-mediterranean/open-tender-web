import React from 'react'
import propTypes from 'prop-types'
import { useSelector, useDispatch } from 'react-redux'
import { selectServiceTypeName } from '../slices/orderSlice'
import { openModal } from '../slices/modalSlice'
import Button from './Button'

const ServiceTypeButton = ({ classes = 'btn' }) => {
  const serviceTypeName = useSelector(selectServiceTypeName)
  const dispatch = useDispatch()

  const handleClick = (evt) => {
    evt.preventDefault()
    dispatch(openModal('serviceType'))
    evt.target.blur()
  }
  return (
    <Button
      text={serviceTypeName}
      ariaLabel={`Change service type from ${serviceTypeName}`}
      icon="MapPin"
      classes={classes}
      onClick={handleClick}
    />
  )
}

ServiceTypeButton.displayName = 'ServiceTypeButton'
ServiceTypeButton.propTypes = {
  classes: propTypes.string,
}

export default ServiceTypeButton
