import React, { useEffect, useCallback } from 'react'
import propTypes from 'prop-types'
import { useSelector, useDispatch } from 'react-redux'
import {
  selectCustomerCreditCards,
  selectCustomerGiftCards,
  updateCustomerGiftCard,
  addCustomerGiftCard,
  resetCustomerGiftCardsError,
} from '@open-tender/redux'
import { GiftCardForm } from '@open-tender/components'

import { closeModal } from '../../slices'
import ModalClose from '../ModalClose'

const GiftCardModal = ({ windowRef, giftCard }) => {
  const dispatch = useDispatch()
  const { loading, error } = useSelector(selectCustomerGiftCards)
  const { entities: creditCards } = useSelector(selectCustomerCreditCards) || {}
  const update = useCallback(
    (id, data, callback) =>
      dispatch(updateCustomerGiftCard(id, data, callback)),
    [dispatch]
  )
  const add = useCallback(
    (data, callback) => dispatch(addCustomerGiftCard(data, callback)),
    [dispatch]
  )
  const callback = useCallback(() => dispatch(closeModal()), [dispatch])

  useEffect(() => {
    return () => dispatch(resetCustomerGiftCardsError())
  }, [dispatch])

  useEffect(() => {
    if (error) windowRef.current.scrollTop = 0
  }, [error, windowRef])

  return (
    <>
      <ModalClose />
      <div className="modal__content">
        <div className="modal__header">
          <p className="modal__title ot-heading ot-font-size-h3">
            {giftCard
              ? `Add value to gift card ${giftCard.card_number}`
              : 'Purchase a new gift card'}
          </p>
        </div>
        <div className="modal__body">
          {!creditCards || !creditCards.length ? (
            <p>
              Please save a credit card to your account before purchasing a gift
              card.
            </p>
          ) : (
            <GiftCardForm
              giftCard={giftCard}
              creditCards={creditCards}
              loading={loading}
              error={error}
              update={update}
              add={add}
              callback={callback}
            />
          )}
        </div>
      </div>
    </>
  )
}

GiftCardModal.displayName = 'GiftCardModal'
GiftCardModal.propTypes = {
  giftCard: propTypes.object,
  windowRef: propTypes.shape({ current: propTypes.any }),
}

export default GiftCardModal
