import propTypes from 'prop-types'
import React, { useEffect, useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { X } from 'react-feather'
import { toggleSidebar } from '../slices/sidebarSlice'

const SidebarClose = ({ classes = 'btn-link' }) => {
  const dispatch = useDispatch()

  const handleClose = (evt) => {
    evt.preventDefault()
    dispatch(toggleSidebar())
    evt.target.blur()
  }

  const handleEscape = useCallback(
    (evt) => {
      if (evt.keyCode === 27) dispatch(toggleSidebar())
    },
    [dispatch]
  )

  useEffect(() => {
    document.addEventListener('keydown', handleEscape, false)
    return () => document.removeEventListener('keydown', handleEscape, false)
  }, [handleEscape])

  return (
    <button className={`sidebar__close ${classes}`} onClick={handleClose}>
      <X size={20} />
    </button>
  )
}

SidebarClose.displayName = 'SidebarClose'
SidebarClose.propTypes = {
  classes: propTypes.string,
  handleClose: propTypes.func,
}

export default SidebarClose
