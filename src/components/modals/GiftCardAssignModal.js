import React, { useEffect, useCallback } from 'react'
import propTypes from 'prop-types'
import { useSelector, useDispatch } from 'react-redux'
import {
  selectCustomerGiftCards,
  assignCustomerGiftCard,
  resetCustomerGiftCardsError,
} from '@open-tender/redux'
import { GiftCardAssignForm } from '@open-tender/components'

import { closeModal } from '../../slices'
import ModalClose from '../ModalClose'
import ModalTitle from '../ModalTitle'

const GiftCardAssignModal = ({ windowRef, validate }) => {
  const dispatch = useDispatch()
  const { loading, error } = useSelector(selectCustomerGiftCards)
  const callback = useCallback(() => {
    if (validate) validate()
    dispatch(closeModal())
  }, [dispatch, validate])
  const assign = useCallback(
    (cardNumber, callback) =>
      dispatch(assignCustomerGiftCard(cardNumber, callback)),
    [dispatch]
  )

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
          <ModalTitle title="Add a gift card to your account" />
          <p className="modal__subtitle">
            Have a gift card number from a physical gift card or gift card
            email? Enter it below to associate the card with your online
            account.
          </p>
        </div>
        <div className="modal__body">
          <GiftCardAssignForm
            loading={loading}
            error={error}
            assign={assign}
            callback={callback}
          />
        </div>
      </div>
    </>
  )
}

GiftCardAssignModal.displayName = 'GiftCardAssignModal'
GiftCardAssignModal.propTypes = {
  windowRef: propTypes.shape({ current: propTypes.any }),
}

export default GiftCardAssignModal
