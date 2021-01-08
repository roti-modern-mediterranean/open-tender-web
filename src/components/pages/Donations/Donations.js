import React, { useCallback, useContext, useEffect } from 'react'
import { isBrowser } from 'react-device-detect'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import { DonationForm } from '@open-tender/components'
import {
  selectDonation,
  resetDonation,
  purchaseDonation,
  selectCustomer,
  fetchCustomerCreditCards,
  selectCustomerCreditCards,
} from '@open-tender/redux'

import { selectBrand, selectConfig } from '../../../slices'
import { AppContext } from '../../../App'
import {
  Background,
  Container,
  Content,
  Main,
  PageTitle,
  PageContent,
  HeaderDefault,
} from '../..'

const Donations = () => {
  const dispatch = useDispatch()
  const { donations: config } = useSelector(selectConfig)
  const { title: siteTitle } = useSelector(selectBrand)
  const { profile: customer } = useSelector(selectCustomer) || {}
  const { entities: creditCards } = useSelector(selectCustomerCreditCards) || {}
  const { success, loading, error, donation } = useSelector(selectDonation)
  const { windowRef } = useContext(AppContext)
  const purchase = useCallback(
    (data, callback) => dispatch(purchaseDonation(data, callback)),
    [dispatch]
  )
  const reset = useCallback(() => dispatch(resetDonation()), [dispatch])

  useEffect(() => {
    windowRef.current.scrollTop = 0
    return () => dispatch(resetDonation())
  }, [windowRef, dispatch])

  useEffect(() => {
    if (success || error) windowRef.current.scrollTop = 0
  }, [success, error, windowRef])

  useEffect(() => {
    dispatch(fetchCustomerCreditCards())
  }, [dispatch, customer])

  const something = null

  return (
    <>
      <Helmet>
        <title>
          {config.title} | {siteTitle}
        </title>
      </Helmet>
      <Background imageUrl={config.background} />
      <Content maxWidth="76.8rem">
        <HeaderDefault title={isBrowser ? null : config.title} />
        <Main>
          <Container>
            <PageTitle {...config} />
            <PageContent>
              {something.that}
              <DonationForm
                customer={customer}
                creditCards={creditCards}
                purchase={purchase}
                reset={reset}
                success={success}
                donation={donation}
                loading={loading}
                error={error}
              />
              {success && (
                <p>
                  {customer ? (
                    <Link to="/account">Head back to your account page</Link>
                  ) : (
                    <Link to="/">
                      Head back to the home page to start an order
                    </Link>
                  )}
                </p>
              )}
            </PageContent>
          </Container>
        </Main>
      </Content>
    </>
  )
}

Donations.displayName = 'Donations'
export default Donations
