import React, { useEffect, useCallback, useMemo } from 'react'
import propTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { X } from 'react-feather'

import { closeModal } from '../slices'

const ModalClose = ({ classes = 'ot-btn-link', onClick }) => {
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
    <button
      className={`modal__close ${classes}`}
      onClick={handleClose}
      aria-label="Close dialog"
    >
      <X size={20} />
    </button>
  )
}

ModalClose.displayName = 'ModalClose'
ModalClose.propTypes = {
  type: propTypes.string,
  handleClose: propTypes.func,
}

export default ModalClose
