import React, { useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import {
  selectCustomer,
  fetchCustomerOrder,
  selectCustomerOrder,
} from 'open-tender-redux'

import Order from './Order'

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
    <div className="content bg-secondary-color">
      <Order {...customerOrder} />
    </div>
  )
}

OrderPage.displayName = 'OrderPage'
export default OrderPage
