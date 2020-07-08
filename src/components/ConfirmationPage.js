import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import {
  selectCustomer,
  selectConfirmationOrder,
  resetConfirmation,
} from '@open-tender/redux'

import { selectConfig } from '../slices'
import Order from './Order'

const ConfirmationPage = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const { confirmation: config } = useSelector(selectConfig)
  const order = useSelector(selectConfirmationOrder)
  const { account } = useSelector(selectCustomer)

  useEffect(() => {
    if (!order) history.push(account ? '/account' : '/')
    window.scroll(0, 0)
    return () => {
      dispatch(resetConfirmation())
    }
  }, [order, account, dispatch, history])

  return (
    <div className="content ot-bg-color-secondary">
      {/* <h1 className="sr-only">Confirmation Page</h1> */}
      <div className="confirmation">
        <div className="container">
          <div className="confirmation__content">
            <p className="confirmation__title ot-heading ot-font-size-h2">
              {config.title}
            </p>
            <p className="confirmation__subtitle">{config.subtitle}</p>
            <p className="confirmation__subtitle ot-bold ot-color-alert">
              {config.spam}
            </p>
          </div>
        </div>
      </div>
      <Order order={order} />
    </div>
  )
}

ConfirmationPage.displayName = 'ConfirmationPage'
export default ConfirmationPage
