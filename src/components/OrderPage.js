import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { selectToken } from '../slices/customerSlice'
import { fetchOrder, selectAccountOrder } from '../slices/accountSlice'
import Order from './Order'

const OrderPage = () => {
  const dispatch = useDispatch()
  const { id: orderId } = useParams()
  const token = useSelector(selectToken)
  const accountOrder = useSelector(selectAccountOrder)

  useEffect(() => {
    window.scroll(0, 0)
  }, [])

  useEffect(() => {
    dispatch(fetchOrder({ token, orderId }))
  }, [dispatch, token, orderId])

  return (
    <div className="content bg-secondary-color">
      <Order {...accountOrder} />
    </div>
  )
}

OrderPage.displayName = 'OrderPage'
export default OrderPage
