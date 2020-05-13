import React from 'react'
import propTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { openModal } from '../slices/modalSlice'
import Button from './Button'

const GroupOrderButton = ({ classes = 'btn' }) => {
  const dispatch = useDispatch()

  const handleClick = (evt) => {
    evt.preventDefault()
    dispatch(openModal('groupOrder'))
    evt.target.blur()
  }
  return (
    <Button
      text="Group Order"
      ariaLabel="Start a Group Order"
      icon="Users"
      classes={classes}
      onClick={handleClick}
    />
  )
}

GroupOrderButton.displayName = 'GroupOrderButton'
GroupOrderButton.propTypes = {
  classes: propTypes.string,
}

export default GroupOrderButton
