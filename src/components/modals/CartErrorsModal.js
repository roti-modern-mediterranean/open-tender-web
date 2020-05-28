import React from 'react'
import propTypes from 'prop-types'
import { useSelector, useDispatch } from 'react-redux'
import { closeModal } from '../../slices/modalSlice'
import { selectCartErrors } from '../../slices/menuSlice'
// import ModalClose from '../ModalClose'
// import { CartErrors } from '../../packages'

const CartErrorsModal = () => {
  const dispatch = useDispatch()
  const { newCart, errors } = useSelector(selectCartErrors)

  const handleRevert = (evt) => {
    evt.preventDefault()
    dispatch(closeModal())
    evt.target.blur()
  }

  const handleNewCart = (evt) => {
    evt.preventDefault()
    dispatch(closeModal())
    evt.target.blur()
  }

  return (
    <>
      {/* <ModalClose classes="" onClick={handleClose} /> */}
      <div className="modal__content">
        {/* <CartErros newCart={newCart} errors={errors} /> */}
      </div>
    </>
  )
}

CartErrorsModal.displayName = 'CartErrorsModal'
CartErrorsModal.propTypes = {
  close: propTypes.func,
}

export default CartErrorsModal
