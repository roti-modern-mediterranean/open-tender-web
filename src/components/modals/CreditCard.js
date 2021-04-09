import React, { useEffect, useCallback, useState } from 'react'
import propTypes from 'prop-types'
import { useSelector, useDispatch } from 'react-redux'
import {
  addCustomerCreditCard,
  resetCustomerCreditCardsError,
  selectCustomerCreditCards,
} from '@open-tender/redux'

import { closeModal } from '../../slices'
import { ModalContent, ModalView } from '..'
import { CreditCardForm } from '../forms'
import { ErrMsg } from '../inputs'

const CreditCard = ({ windowRef }) => {
  const dispatch = useDispatch()
  const [hasSubmit, setHasSubmit] = useState(false)
  const { loading, error } = useSelector(selectCustomerCreditCards)
  const errMsg = error
    ? error.form.includes('parameters')
      ? 'There are one or more errors below'
      : error.form
    : null
  const addCard = useCallback((data) => dispatch(addCustomerCreditCard(data)), [
    dispatch,
  ])

  useEffect(() => {
    return () => dispatch(resetCustomerCreditCardsError())
  }, [dispatch])

  useEffect(() => {
    if (loading === 'pending') setHasSubmit(true)
  }, [dispatch, loading])

  useEffect(() => {
    if (hasSubmit && loading === 'idle') {
      if (error) {
        setHasSubmit(false)
        windowRef.current.scrollTop = 0
      } else {
        dispatch(closeModal())
      }
    }
  }, [hasSubmit, loading, error, windowRef, dispatch])

  return (
    <ModalView>
      <ModalContent
        title="Add a new credit card"
        subtitle={
          <p>
            Adding a credit card this way allows you to use it for payment on
            the checkout page and elsewhere on this website.
          </p>
        }
      >
        {/* <CreditCardForm
          windowRef={windowRef}
          loading={loading}
          error={error}
          addCard={addCard}
          callback={callback}
        /> */}
        <ErrMsg errMsg={errMsg} style={{ margin: '0 0 2rem' }} />
        <CreditCardForm
          apply={addCard}
          tenderErrors={error}
          hideSave={true}
          submitting={loading === 'pending'}
          submitText="Save"
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
