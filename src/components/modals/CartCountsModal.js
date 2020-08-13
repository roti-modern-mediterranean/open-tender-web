import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { selectCart } from '@open-tender/redux'
import { CartCounts } from '@open-tender/components'

import { closeModal, selectConfig } from '../../slices'
import ModalClose from '../ModalClose'
import ModalTitle from '../ModalTitle'

const CartCountsModal = ({ errors }) => {
  const dispatch = useDispatch()
  const { menu } = useSelector(selectConfig)
  const cart = useSelector(selectCart)

  const handleClose = (evt) => {
    evt.preventDefault()
    dispatch(closeModal())
    evt.target.blur()
  }

  return (
    <>
      <ModalClose classes="" onClick={handleClose} />
      <div className="modal__content">
        <div className="modal__header">
          <ModalTitle title={menu.cartErrors.title} />
          <p className="modal__subtitle">{menu.cartErrors.subtitle}</p>
        </div>
        <div className="modal__body">
          <CartCounts cart={cart} errors={errors} />
        </div>
      </div>
    </>
  )
}

CartCountsModal.displayName = 'CartCountsModal'

export default CartCountsModal
