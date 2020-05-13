import React from 'react'
import propTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { openModal } from '../slices/modalSlice'
import Button from './Button'

const AllergensButton = ({ classes = 'btn' }) => {
  const dispatch = useDispatch()

  const handleClick = (evt) => {
    evt.preventDefault()
    dispatch(openModal('allergens'))
    evt.target.blur()
  }
  return (
    <Button
      text="Allergens"
      ariaLabel="Highlight allergens on the menu"
      icon="Sliders"
      classes={classes}
      onClick={handleClick}
    />
  )
}

AllergensButton.displayName = 'AllergensButton'
AllergensButton.propTypes = {
  classes: propTypes.string,
}

export default AllergensButton
