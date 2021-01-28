import React, { useEffect, useCallback } from 'react'
import propTypes from 'prop-types'
import { useSelector, useDispatch } from 'react-redux'
import {
  addCustomerCreditCard,
  resetCustomerCreditCardsError,
  selectCustomerCreditCards,
  selectCustomer,
  fetchCustomerCreditCards,
} from '@open-tender/redux'
import { AuthApplePay, CreditCardForm } from '@open-tender/components'

import { closeModal, selectAPI, selectBrand } from '../../slices'
import { Loading, ModalContent, ModalView } from '..'

const CreditCard = ({ windowRef }) => {
  const dispatch = useDispatch()
  const brand = useSelector(selectBrand)
  const api = useSelector(selectAPI)
  const { profile } = useSelector(selectCustomer)
  const { customer_id } = profile || {}
  const { loading, error } = useSelector(selectCustomerCreditCards)
  const addCard = useCallback(
    (data, callback) => dispatch(addCustomerCreditCard(data, callback)),
    [dispatch]
  )
  const callback = useCallback(() => dispatch(closeModal()), [dispatch])
  const applePayCallback = useCallback(() => {
    const includeLinked = true
    dispatch(fetchCustomerCreditCards(includeLinked))
    dispatch(closeModal())
  }, [dispatch])

  useEffect(() => {
    return () => dispatch(resetCustomerCreditCardsError())
  }, [dispatch])

  useEffect(() => {
    if (error) windowRef.current.scrollTop = 0
  }, [error, windowRef])

  return (
    <ModalView>
      <ModalContent title="Add a new credit card">
        {!!brand.applePayMerchantId && (
          <AuthApplePay
            api={api}
            brand={brand}
            customerId={customer_id}
            amount="1.00"
            spinner={<Loading />}
            callback={applePayCallback}
          />
        )}
        <CreditCardForm
          windowRef={windowRef}
          loading={loading}
          error={error}
          addCard={addCard}
          callback={callback}
        />
      </ModalContent>
    </ModalView>
  )
}

CreditCard.displayName = 'CreditCard'
CreditCard.propTypes = {
  windowRef: propTypes.shape({ current: propTypes.any }),
}

export default CreditCard
