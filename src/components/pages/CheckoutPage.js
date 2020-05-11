import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { selectConfig } from '../../slices/configSlice'
import {
  selectCart,
  selectCartQuantity,
  selectLocation,
  selectMenuSlug,
  selectMenuVars,
} from '../../slices/orderSlice'
import { submitOrder } from '../../slices/checkoutSlice'
import { CheckoutForm, Check } from '../packages'
import { prepareOrder } from '../packages/utils'

const CheckoutPage = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const { checkout: checkoutConfig } = useSelector(selectConfig)
  const cart = useSelector(selectCart)
  const cartCount = useSelector(selectCartQuantity)
  const menuSlug = useSelector(selectMenuSlug)
  const { locationId, serviceType, requestedAt } = useSelector(selectMenuVars)

  useEffect(() => {
    window.scroll(0, 0)
  }, [])

  useEffect(() => {
    const order = prepareOrder(locationId, serviceType, requestedAt, cart)
    dispatch(submitOrder(order))
  }, [locationId, serviceType, requestedAt, cart, dispatch])

  useEffect(() => {
    if (cartCount === 0) history.push(menuSlug)
  }, [cartCount, menuSlug, history])

  return (
    <div className="content bg-secondary-color">
      <div className="content__container">
        {/* <div className="content__header">
          <h1 className="content__title ot-font-size-h2">
            {checkoutConfig.title}
          </h1>
          <p className="content__subtitle">{checkoutConfig.subtitle}</p>
        </div> */}
        <div className="checkout">
          <div className="checkout__deals"></div>
          <div className="checkout__form">
            <CheckoutForm />
          </div>
          <div className="checkout__summary"></div>
        </div>
      </div>
    </div>
  )
}

CheckoutPage.displayName = 'CheckoutPage'
export default CheckoutPage
