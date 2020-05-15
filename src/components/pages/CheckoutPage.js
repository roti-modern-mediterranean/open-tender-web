import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { selectConfig } from '../../slices/configSlice'
import {
  selectCart,
  selectCartQuantity,
  selectMenuSlug,
  selectMenuVars,
  selectOrder,
} from '../../slices/orderSlice'
import {
  selectCheck,
  updateCheck,
  submitOrder,
} from '../../slices/checkoutSlice'
import { CheckoutForm, Check } from '../../packages'
import { prepareOrder } from '../../packages/utils'
import { selectAccount } from '../../slices/customerSlice'

const CheckoutPage = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const { checkout: checkoutConfig } = useSelector(selectConfig)
  const cart = useSelector(selectCart)
  const cartCount = useSelector(selectCartQuantity)
  const menuSlug = useSelector(selectMenuSlug)
  const { locationId, serviceType, requestedAt } = useSelector(selectMenuVars)
  const order = useSelector(selectOrder)
  const check = useSelector(selectCheck)
  const customer = useSelector(selectAccount)
  const { totals } = check || {}
  // console.log(order)
  // console.log(order.check)

  useEffect(() => {
    window.scroll(0, 0)
  }, [])

  useEffect(() => {
    if (!locationId) history.push('/')
    const order = prepareOrder(
      locationId,
      serviceType,
      requestedAt,
      cart,
      customer
    )
    dispatch(submitOrder(order))
  }, [locationId, serviceType, requestedAt, cart, customer, dispatch, history])

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
                config={checkoutConfig}
                order={order}
                check={check}
                updateCheck={(payload) => dispatch(updateCheck(payload))}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="checkout__sidebar bg-secondary-color">
        <div className="checkout__sidebar__wrapper">
          <div className="checkout__sidebar__container">
            <div className="checkout__totals">
              {totals && (
                <Check title={checkoutConfig.check_title} totals={totals} />
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
