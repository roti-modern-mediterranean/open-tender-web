import React from 'react'
import propTypes from 'prop-types'
import { useSelector, useDispatch } from 'react-redux'
import { selectRequestedAt } from '../slices/orderSlice'
import { openModal } from '../slices/modalSlice'
import Button from './Button'

const RequestedAtButton = ({ classes = 'btn' }) => {
  const requestedAt = useSelector(selectRequestedAt)
  const dispatch = useDispatch()

  const handleChange = (evt) => {
    evt.preventDefault()
    dispatch(openModal('requestedAt'))
    evt.target.blur()
  }
  return (
    <Button
      text={requestedAt}
      ariaLabel={`Change time from ${requestedAt}`}
      icon="Clock"
      classes={classes}
      onClick={handleChange}
    />
  )
}

RequestedAtButton.displayName = 'RequestedAtButton'
RequestedAtButton.propTypes = {
  classes: propTypes.string,
}

export default RequestedAtButton
