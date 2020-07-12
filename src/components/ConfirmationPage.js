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

import { selectConfig } from '../slices'
import Order from './Order'
import Background from './Background'
import PageTitle from './PageTitle'

const ConfirmationPage = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const { confirmation: config } = useSelector(selectConfig)
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
      {isBrowser && <Background imageUrl={config.background} />}
      <div className="content">
        <PageTitle {...config} />
        <div className="slide-up">
          <div className="container">
            {auth ? (
              <p>
                <button
                  type="button"
                  className="ot-btn-link"
                  onClick={reviewAccount}
                >
                  Review your account
                </button>
                {' or '}
                <button
                  type="button"
                  className="ot-btn-link"
                  onClick={startNewOrder}
                >
                  start a new order
                </button>
              </p>
            ) : (
              <p>
                <button
                  type="button"
                  className="ot-btn-link"
                  onClick={startNewOrder}
                >
                  Start a new order
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
