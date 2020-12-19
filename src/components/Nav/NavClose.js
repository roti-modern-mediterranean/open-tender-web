import React, { useEffect, useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { X } from 'react-feather'
import { toggleNav } from '../../slices'
import styled from '@emotion/styled'

const NavCloseButton = styled('button')`
  position: absolute;
  z-index: 1;
  top: 10px;
  right: 10px;
  color: ${(props) => props.theme.fonts.headings.color};

  &:hover,
  &:active,
  &:focus {
    color: ${(props) => props.theme.fonts.headings.color};
  }

  &:disabled {
    color: ${(props) => props.theme.fonts.headings.color};
    opacity: 0.5;
  }
`

const NavClose = () => {
  const dispatch = useDispatch()

  const handleClose = (evt) => {
    evt.preventDefault()
    dispatch(toggleNav())
    evt.target.blur()
  }

  const handleEscape = useCallback(
    (evt) => {
      if (evt.keyCode === 27) dispatch(toggleNav())
    },
    [dispatch]
  )

  useEffect(() => {
    document.addEventListener('keydown', handleEscape, false)
    return () => document.removeEventListener('keydown', handleEscape, false)
  }, [handleEscape])

  return (
    <NavCloseButton
      onClick={handleClose}
      aria-label="Close menu & return to current page"
    >
      <X size={20} />
    </NavCloseButton>
  )
}

NavClose.displayName = 'NavClose'

export default NavClose
