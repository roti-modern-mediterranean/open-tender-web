import React, { useCallback, useEffect } from 'react'
import { isBrowser } from 'react-device-detect'
import { useDispatch, useSelector } from 'react-redux'
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

import { selectBrand, selectConfig } from '../slices'
import PageTitle from './PageTitle'
import Background from './Background'
import { Link } from 'react-router-dom'

const DonationsPage = () => {
  const dispatch = useDispatch()
  const config = useSelector(selectConfig)
  const { title } = useSelector(selectBrand)
  const { profile: customer } = useSelector(selectCustomer) || {}
  const { entities: creditCards } = useSelector(selectCustomerCreditCards) || {}
  const { success, loading, error, donation } = useSelector(selectDonation)
  const purchase = useCallback(
    (data, callback) => dispatch(purchaseDonation(data, callback)),
    [dispatch]
  )
  const reset = useCallback(() => dispatch(resetDonation()), [dispatch])

  useEffect(() => {
    window.scroll(0, 0)
  }, [])

  useEffect(() => {
    if (success || error) window.scroll(0, 0)
  }, [success, error])

  useEffect(() => {
    dispatch(fetchCustomerCreditCards())
  }, [dispatch, customer])

  useEffect(() => {
    return () => dispatch(resetDonation())
  }, [dispatch])

  return (
    <>
      <Helmet>
        <title>
          {config.donations.title} | {title}
        </title>
      </Helmet>
      {isBrowser && <Background imageUrl={config.donations.background} />}
      <div className="content">
        <PageTitle {...config.donations} />
        <div className="content__body ot-line-height slide-up">
          <div className="container">
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
          </div>
        </div>
      </div>
    </>
  )
}

DonationsPage.displayName = 'DonationsPage'
export default DonationsPage
