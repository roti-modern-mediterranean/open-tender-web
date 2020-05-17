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
  updateForm,
  updateCustomer,
  submitOrder,
  selectCheckout,
} from '../../slices/checkoutSlice'
import { openModal } from '../../slices/modalSlice'
import { logoutCustomer, selectCustomer } from '../../slices/customerSlice'
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
  const customer = useSelector(selectCustomer)
  const { account, auth } = customer
  const { access_token } = auth || {}
  const { check, form, loading, errors } = useSelector(selectCheckout)
  const { discounts, promoCodes } = form
  const { totals } = check || {}

  useEffect(() => {
    window.scroll(0, 0)
  }, [])

  useEffect(() => {
    if (cartCount === 0) history.push(menuSlug)
  }, [cartCount, menuSlug, history])

  useEffect(() => {
    dispatch(updateCustomer(account))
  }, [dispatch, account])

  useEffect(() => {
    if (!locationId) return history.push('/')
    const orderCustomer = account ? { customer_id: account.customer_id } : null
    const order = prepareOrder(
      locationId,
      serviceType,
      requestedAt,
      cart,
      orderCustomer,
      discounts,
      promoCodes
    )
    dispatch(submitOrder(order))
  }, [
    locationId,
    serviceType,
    requestedAt,
    cart,
    account,
    discounts,
    promoCodes,
    dispatch,
    history,
  ])

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
                form={form}
                loading={loading}
                errors={errors}
                updateForm={(payload) => dispatch(updateForm(payload))}
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
