import React, { useCallback, useContext, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Helmet } from 'react-helmet'
import { Minus, Plus } from 'react-feather'
import { useHistory } from 'react-router-dom'
import {
  selectGiftCards,
  resetGiftCards,
  purchaseGiftCards,
  selectCustomer,
  fetchCustomerCreditCards,
  selectCustomerCreditCardsForPayment,
  setAlert,
} from '@open-tender/redux'

import { maybeRefreshVersion } from '../../../app/version'
import { selectBrand, selectConfig } from '../../../slices'
import { AppContext } from '../../../App'
import {
  Content,
  Main,
  HeaderDefault,
  PageContainer,
  CheckoutHeader,
  InlineLink,
} from '../..'
import { FormWrapper } from '../../inputs'
import { GiftCardsForm } from '../../forms'

const iconMap = {
  plus: <Plus size={null} />,
  minus: <Minus size={null} />,
}

const GiftCards = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const { giftCards: config } = useSelector(selectConfig)
  const { title, subtitle } = config
  const { title: siteTitle } = useSelector(selectBrand)
  const { profile: customer } = useSelector(selectCustomer) || {}
  const creditCards = useSelector(selectCustomerCreditCardsForPayment)
  console.log(creditCards)
  const { success, loading, error, giftCards } = useSelector(selectGiftCards)
  const purchase = useCallback(
    (data, callback) => dispatch(purchaseGiftCards(data, callback)),
    [dispatch]
  )
  const reset = useCallback(() => dispatch(resetGiftCards()), [dispatch])
  const showAlert = useCallback((obj) => dispatch(setAlert(obj)), [dispatch])
  const { windowRef } = useContext(AppContext)

  useEffect(() => {
    windowRef.current.scrollTop = 0
    maybeRefreshVersion()
  }, [windowRef])

  useEffect(() => {
    dispatch(fetchCustomerCreditCards())
  }, [dispatch, customer])

  useEffect(() => {
    return () => dispatch(resetGiftCards())
  }, [dispatch])

  return (
    <>
      <Helmet>
        <title>
          {title} | {siteTitle}
        </title>
      </Helmet>
      <Content>
        <HeaderDefault />
        <Main>
          <PageContainer>
            <CheckoutHeader title={title} />
            <FormWrapper>
              {subtitle && <p>{subtitle}</p>}
              <GiftCardsForm
                customer={customer}
                creditCards={creditCards}
                purchase={purchase}
                setAlert={showAlert}
                reset={reset}
                success={success}
                purchasedCards={giftCards}
                loading={loading}
                error={error}
                iconMap={iconMap}
                windowRef={windowRef}
              />
              {success && (
                <p style={{ margin: '3rem 0 0' }}>
                  <InlineLink onClick={() => history.push('/')}>
                    {customer
                      ? 'Head back to your account page'
                      : 'Head back to the home page to start an order'}
                  </InlineLink>
                </p>
              )}
            </FormWrapper>
          </PageContainer>
        </Main>
      </Content>
    </>
  )
}

GiftCards.displayName = 'GiftCards'
export default GiftCards
