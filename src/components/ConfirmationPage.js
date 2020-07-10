import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { isBrowser } from 'react-device-detect'
import {
  selectCustomer,
  selectConfirmationOrder,
  resetConfirmation,
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
  const { account } = useSelector(selectCustomer)

  useEffect(() => {
    if (!order) history.push(account ? '/account' : '/')
    window.scroll(0, 0)
    return () => {
      dispatch(resetConfirmation())
    }
  }, [order, account, dispatch, history])

  return (
    <>
      {isBrowser && <Background imageUrl={config.background} />}
      <div className="content">
        <PageTitle {...config} />
        <Order order={order} />
      </div>
    </>
  )
}

ConfirmationPage.displayName = 'ConfirmationPage'
export default ConfirmationPage
