import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { fetchOrder, selectAccountOrder } from 'open-tender-redux'

import Order from './Order'

const OrderPage = () => {
  const dispatch = useDispatch()
  const { id: orderId } = useParams()
  const accountOrder = useSelector(selectAccountOrder)

  useEffect(() => {
    window.scroll(0, 0)
  }, [])

  useEffect(() => {
    dispatch(fetchOrder({ orderId }))
  }, [dispatch, orderId])

  return (
    <div className="content bg-secondary-color">
      <Order {...accountOrder} />
    </div>
  )
}

OrderPage.displayName = 'OrderPage'
export default OrderPage
