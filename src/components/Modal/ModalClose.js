import React, { useEffect, useCallback, useMemo } from 'react'
import propTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { X } from 'react-feather'

import { closeModal } from '../../slices'
import styled from '@emotion/styled'

const ModalCloseView = styled('button')`
  position: absolute;
  z-index: 1;
  top: 7px;
  right: 7px;
  display: inline;
  font-size: inherit;
  color: ${(props) => props.theme.links.primary.color};
  &:hover,
  &:active,
  &:focus {
    color: ${(props) => props.theme.links.primary.hover};
  }
  &:disabled {
    color: ${(props) => props.theme.links.primary.color};
    opacity: 0.5;
  }
`

const ModalClose = ({ onClick }) => {
  const dispatch = useDispatch()
  const handleClose = useMemo(() => onClick || (() => dispatch(closeModal())), [
    onClick,
    dispatch,
  ])

  const handleEscape = useCallback(
    (evt) => {
      if (evt.keyCode === 27) handleClose()
    },
    [handleClose]
  )

  useEffect(() => {
    document.addEventListener('keydown', handleEscape, false)
    return () => document.removeEventListener('keydown', handleEscape, false)
  }, [handleEscape])

  return (
    <ModalCloseView onClick={handleClose} aria-label="Close dialog">
      <X size={20} />
    </ModalCloseView>
  )
}

ModalClose.displayName = 'ModalClose'
ModalClose.propTypes = {
  type: propTypes.string,
  handleClose: propTypes.func,
}

export default ModalClose
