import React from 'react'
import propTypes from 'prop-types'
import { useHistory, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectMenuSlug } from '../slices/orderSlice'
import Button from './Button'

const ButtonMenu = ({ classes = 'btn' }) => {
  const history = useHistory()
  const { pathname } = useLocation()
  const isMenu = pathname.includes('menu')
  const menuSlug = useSelector(selectMenuSlug)

  const handleBack = (evt) => {
    evt.preventDefault()
    if (!isMenu) history.push(menuSlug)
    evt.target.blur()
  }

  return (
    <Button
      text="Back To Menu"
      ariaLabel="Back To Menu"
      icon="ArrowLeft"
      classes={classes}
      onClick={handleBack}
    />
  )
}

ButtonMenu.displayName = 'ButtonMenu'
ButtonMenu.propTypes = {
  classes: propTypes.string,
}

export default ButtonMenu
