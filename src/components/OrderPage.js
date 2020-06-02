import React, { useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { selectToken } from '../slices/customerSlice'
import {
  fetchOrder,
  resetAccountOrder,
  selectAccountOrder,
} from '../slices/accountSlice'
import Order from './Order'

const OrderPage = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const { id: orderId } = useParams()
  const token = useSelector(selectToken)
  const accountOrder = useSelector(selectAccountOrder)

  useEffect(() => {
    window.scroll(0, 0)
  }, [])

  useEffect(() => {
    dispatch(fetchOrder({ token, orderId }))
  }, [dispatch, token, orderId])

  const goToAccount = (evt) => {
    evt.preventDefault()
    dispatch(resetAccountOrder())
    history.push('/account')
    evt.target.blur()
  }

  return (
    <div className="content bg-secondary-color">
      <Order {...accountOrder} goToAccount={goToAccount} />
    </div>
  )
}

OrderPage.displayName = 'OrderPage'
export default OrderPage
