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
import {
  selectCheckoutOrder,
  updateOrder,
  submitOrder,
} from '../../slices/checkoutSlice'
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
  const order = useSelector(selectCheckoutOrder)
  const { check } = order || {}
  // console.log(order)
  // console.log(order.check)

  useEffect(() => {
    window.scroll(0, 0)
  }, [])

  useEffect(() => {
    if (!locationId) history.push('/')
    const order = prepareOrder(locationId, serviceType, requestedAt, cart)
    dispatch(submitOrder(order))
  }, [locationId, serviceType, requestedAt, cart, dispatch, history])

  useEffect(() => {
    if (cartCount === 0) history.push(menuSlug)
  }, [cartCount, menuSlug, history])

  return (
    <div className="checkout">
      <div className="checkout__content">
        <div className="checkout__content__wrapper">
          <div className="checkout__content__container">
            <div className="checkout__form">
              <div className="checkout__header">
                <h1 className="checkout__title ot-font-size-h2">
                  {checkoutConfig.title}
                </h1>
                <p className="checkout__subtitle">{checkoutConfig.subtitle}</p>
              </div>
              <CheckoutForm
                order={order}
                updateOrder={(payload) => dispatch(updateOrder(payload))}
                config={checkoutConfig}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="checkout__sidebar bg-secondary-color">
        <div className="checkout__sidebar__wrapper">
          <div className="checkout__sidebar__container">
            <div className="checkout__totals">
              {check && (
                <Check check={check} title={checkoutConfig.check_title} />
              )}
              {/* <div>Content goes here</div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

CheckoutPage.displayName = 'CheckoutPage'
export default CheckoutPage
