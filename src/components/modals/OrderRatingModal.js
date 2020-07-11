import React, { useCallback } from 'react'
import propTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { updateOrderRating } from '@open-tender/redux'
import { OrderRatingForm } from '@open-tender/components'

import { closeModal } from '../../slices'
import ModalClose from '../ModalClose'
import { Star } from 'react-feather'

const OrderRatingModal = ({ orderId, orderRating }) => {
  const dispatch = useDispatch()
  const updateRating = useCallback(
    (orderId, data) => dispatch(updateOrderRating(orderId, data)),
    [dispatch]
  )
  const callback = useCallback(() => dispatch(closeModal()), [dispatch])

  return (
    <>
      <ModalClose />
      <div className="modal__content">
        <div className="modal__header">
          <p className="modal__title ot-heading ot-font-size-h3">
            Rate your order
          </p>
          <p className="modal__subtitle">
            Please add a rating and an any additional comments below
          </p>
        </div>
        <div className="modal__body">
          <OrderRatingForm
            orderId={orderId}
            orderRating={orderRating}
            icon={<Star size={null} />}
            updateRating={updateRating}
            callback={callback}
          />
        </div>
      </div>
    </>
  )
}

OrderRatingModal.displayName = 'OrderRatingModal'
OrderRatingModal.propTypes = {
  orderId: propTypes.number,
  orderRating: propTypes.object,
}

export default OrderRatingModal
