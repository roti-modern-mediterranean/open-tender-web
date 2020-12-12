import React, { useEffect } from 'react'
import { useParams, useHistory, Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import {
  selectCustomer,
  fetchCustomerOrder,
  selectCustomerOrder,
} from '@open-tender/redux'

import Order from './Order'
import AccountBackground from './AccountBackground'

const OrdersPageBack = () => (
  <div className="section">
    <div className="container">
      <div className="section__container align-center">
        <Link to="/orders">Back to all recent orders</Link>
      </div>
    </div>
  </div>
)

const OrderPage = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const { id: orderId } = useParams()
  const { auth } = useSelector(selectCustomer)
  const customerOrder = useSelector(selectCustomerOrder)

  useEffect(() => {
    window.scroll(0, 0)
  }, [])

  useEffect(() => {
    if (!auth) return history.push('/')
  }, [auth, history])

  useEffect(() => {
    dispatch(fetchCustomerOrder(orderId))
  }, [dispatch, orderId])

  return (
    <>
      <AccountBackground />
      <div className="content ot-bg-color-secondary">
        <div className="order__container">
          <OrdersPageBack />
          <div className="order__wrapper ot-bg-color-primary">
            <Order {...customerOrder} />
          </div>
          <OrdersPageBack />
        </div>
      </div>
    </>
  )
}

OrderPage.displayName = 'OrderPage'
export default OrderPage
