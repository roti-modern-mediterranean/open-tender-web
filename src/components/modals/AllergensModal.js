import React from 'react'
import propTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { closeModal } from '../../slices/modalSlice'
import ModalClose from '../ModalClose'

const AllergensModal = () => {
  const dispatch = useDispatch()

  const handleClose = () => {
    dispatch(closeModal())
  }

  return (
    <>
      <ModalClose classes="btn-link" onClick={handleClose} />
      <div className="modal__content">
        <div className="modal__header">
          <p className="modal__title heading ot-font-size-h3">
            Highlight Allergens
          </p>
          <p className="modal__subtitle">
            Click on the allergens below to highlight them on the menu
          </p>
        </div>
        <div className="modal__body">
          <p>This is where the content will go</p>
        </div>
      </div>
    </>
  )
}

AllergensModal.displayName = 'AllergensModal'
AllergensModal.propTypes = {
  close: propTypes.func,
}

export default AllergensModal
