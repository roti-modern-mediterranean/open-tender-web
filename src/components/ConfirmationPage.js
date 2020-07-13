import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { isBrowser } from 'react-device-detect'
import {
  selectCustomer,
  selectConfirmationOrder,
  resetConfirmation,
  resetCustomerOrder,
} from '@open-tender/redux'

import { selectConfig, selectBrand } from '../slices'
import Order from './Order'
import Background from './Background'
import PageTitle from './PageTitle'

const ConfirmationPage = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const config = useSelector(selectConfig)
  const brand = useSelector(selectBrand)
  const order = useSelector(selectConfirmationOrder)
  const { auth } = useSelector(selectCustomer)

  useEffect(() => {
    if (!order) history.push(auth ? '/account' : '/')
    window.scroll(0, 0)
    return () => {
      dispatch(resetConfirmation())
    }
  }, [order, auth, dispatch, history])

  const reviewAccount = (evt) => {
    evt.preventDefault()
    dispatch(resetCustomerOrder())
    history.push('/account')
    evt.target.blur()
  }

  const startNewOrder = (evt) => {
    evt.preventDefault()
    history.push('/')
    evt.target.blur()
  }

  return (
    <>
      {isBrowser && <Background imageUrl={config.confirmation.background} />}
      <div className="content">
        <PageTitle {...config.confirmation} />
        <div className="slide-up">
          <div className="container">
            {auth ? (
              <p>
                <button
                  type="button"
                  className="ot-btn-link"
                  onClick={reviewAccount}
                >
                  Head back to your account
                </button>
                {' or '}
                <button
                  type="button"
                  className="ot-btn-link"
                  onClick={startNewOrder}
                >
                  start another order
                </button>
              </p>
            ) : (
              <p>
                <a
                  className="no-link"
                  href={brand.url}
                  rel="noopener noreferrer"
                >
                  Head back to our website
                </a>
                {' or '}
                <button
                  type="button"
                  className="ot-btn-link"
                  onClick={startNewOrder}
                >
                  start another order
                </button>
              </p>
            )}
          </div>
        </div>
        <Order order={order} />
      </div>
    </>
  )
}

ConfirmationPage.displayName = 'ConfirmationPage'
export default ConfirmationPage
