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
  updateCheck,
  updateDiscounts,
  submitOrder,
  selectCheckout,
} from '../../slices/checkoutSlice'
import { openModal } from '../../slices/modalSlice'
import { logoutCustomer, selectAccount } from '../../slices/customerSlice'
import { CheckoutForm, Check } from '../../packages'
import { prepareOrder } from '../../packages/utils'

const CheckoutPage = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const { checkout: checkoutConfig } = useSelector(selectConfig)
  const cart = useSelector(selectCart)
  const cartCount = useSelector(selectCartQuantity)
  const menuSlug = useSelector(selectMenuSlug)
  const { locationId, serviceType, requestedAt } = useSelector(selectMenuVars)
  const order = useSelector(selectOrder)
  const customer = useSelector(selectAccount)
  const { access_token } = customer ? customer.auth || {} : {}
  const { check, discounts, loading } = useSelector(selectCheckout)
  const { totals } = check || {}

  useEffect(() => {
    window.scroll(0, 0)
  }, [])

  useEffect(() => {
    if (!locationId) return history.push('/')
    const order = prepareOrder(
      locationId,
      serviceType,
      requestedAt,
      cart,
      customer,
      discounts
    )
    dispatch(submitOrder(order))
  }, [
    locationId,
    serviceType,
    requestedAt,
    cart,
    customer,
    discounts,
    dispatch,
    history,
  ])

  useEffect(() => {
    if (cartCount === 0) history.push(menuSlug)
  }, [cartCount, menuSlug, history])

  const pending = loading === 'pending'

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
                updateDiscounts={(discounts) =>
                  dispatch(updateDiscounts(discounts))
                }
                login={() => dispatch(openModal('login'))}
                logout={() => dispatch(logoutCustomer(access_token))}
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
                <Check
                  title={checkoutConfig.check_title}
                  totals={totals}
                  updating={pending}
                />
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
