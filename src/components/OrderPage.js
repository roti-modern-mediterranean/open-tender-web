import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { selectToken } from '../slices/customerSlice'
import { fetchOrder, selectAccountOrder } from '../slices/accountSlice'

const OrderPage = () => {
  const dispatch = useDispatch()
  const { id: orderId } = useParams()
  const token = useSelector(selectToken)
  const { entity, loading, error } = useSelector(selectAccountOrder)
  // console.log(entity)

  useEffect(() => {
    dispatch(fetchOrder({ token, orderId }))
  }, [dispatch, token, orderId])

  return (
    <div className="order-page">
      <h1>Order #{entity.order_id}</h1>
    </div>
  )
}

OrderPage.displayName = 'OrderPage'
export default OrderPage
